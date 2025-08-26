// handler.js
"use strict";

const {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const REGION = process.env.AWS_REGION || "ap-northeast-2";
const SOURCE_BUCKET = process.env.SOURCE_BUCKET;
const DEST_BUCKET = process.env.DEST_BUCKET;

const s3 = new S3Client({ region: REGION });

/** Node 스트림 → Buffer */
async function streamToBuffer(body) {
  // SDK v3의 Body는 Node Readable(스트림)
  return await new Promise((resolve, reject) => {
    const chunks = [];
    body.on("data", (c) => chunks.push(c));
    body.on("end", () => resolve(Buffer.concat(chunks)));
    body.on("error", reject);
  });
}

/** 키/Content-Type 기준 이미지 여부 판별 */
function isImageByKeyOrType(key, contentType) {
  const byCt = (contentType || "").toLowerCase().startsWith("image/");
  const byKey = /\.(jpe?g|png|gif|webp|bmp|tiff?)$/i.test(key || "");
  return byCt || byKey;
}

exports.optimizer = async (event) => {
  try {
    const rec = event?.Records?.[0];
    if (!rec) return { statusCode: 204, body: "no record" };

    const bucket = rec.s3?.bucket?.name;
    const rawKey = rec.s3?.object?.key || "";
    // S3 이벤트의 키에는 공백이 + 로 오기도 하므로 복원
    const key = decodeURIComponent(rawKey.replace(/\+/g, " "));

    // 소스 버킷만 처리 (혹시 다른 버킷 이벤트가 들어와도 안전하게 스킵)
    if (bucket !== SOURCE_BUCKET) {
      console.log("skip other bucket", { bucket });
      return { statusCode: 204, body: "skip" };
    }

    // 이미지 여부 확인 (HeadObject로 Content-Type 먼저 확인)
    const head = await s3.send(
      new HeadObjectCommand({ Bucket: bucket, Key: key })
    );
    const contentType = head.ContentType || "application/octet-stream";
    if (!isImageByKeyOrType(key, contentType)) {
      console.log("not an image, skip", { key, contentType });
      return { statusCode: 204, body: "not image" };
    }

    // 원본 가져오기
    const obj = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const inputBuf = await streamToBuffer(obj.Body);

    // Sharp가 있으면 최적화(WebP 변환 + 리사이즈), 없으면 그대로 복사
    let outBuf = inputBuf;
    let outKey = key; // 기본: 확장자 유지
    let outContentType = contentType;

    try {
      const sharp = require("sharp"); // 선택 의존성: 없으면 catch로 이동
      outBuf = await sharp(inputBuf)
        .rotate() // EXIF 기준 회전
        .resize({ width: 1280, withoutEnlargement: true })
        .toFormat("webp", { quality: 80 });
      outKey = key.replace(/\.[^.]+$/, "") + ".webp";
      outContentType = "image/webp";
      console.log("optimized with sharp", { key, outKey });
    } catch (e) {
      // sharp 미설치 시 그대로 복사
      if (
        e?.code === "MODULE_NOT_FOUND" ||
        /Cannot find module 'sharp'/.test(String(e))
      ) {
        console.log("sharp not installed; copying as-is");
      } else {
        // sharp 내부 오류면 그대로 원본 복사로 폴백
        console.warn("sharp error; fallback to copy", e);
      }
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: DEST_BUCKET,
        Key: outKey,
        Body: outBuf,
        ContentType: outContentType,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        src: `${bucket}/${key}`,
        dest: `${DEST_BUCKET}/${outKey}`,
        optimized: outContentType === "image/webp",
      }),
    };
  } catch (err) {
    console.error("optimizer error", err);
    // S3 이벤트는 비동기 호출이므로, 실패해도 200/500 관계없이 재시도 정책과는 무관합니다.
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal error" }),
    };
  }
};

/** (옵션) 헬스체크용 */
exports.hello = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
      env: { SOURCE_BUCKET, DEST_BUCKET, REGION },
    }),
  };
};
