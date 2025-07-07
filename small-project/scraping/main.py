import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

SERVICE_KEY = os.getenv("SERVICE_KEY")
KAKAO_TOKEN = os.getenv("KAKAO_TOKEN")
CACHE_FILE = "latest_timestamp.txt"

API_ENDPOINT = "https://apis.data.go.kr/1471000/MdcinRtrvlSleStpgeInfoService04"

def get_latest_recall():
    params = {
        "serviceKey": SERVICE_KEY,
        "pageNo": "1",
        "numOfRows": "1",
        "_type": "json"  # 반드시 넣어야 JSON 응답됨
    }
    with httpx.Client(verify=False) as client:
        res = client.get(API_ENDPOINT, params=params)
        res.raise_for_status()
        items = res.json().get("body", {}).get("items", [])
        if items:
            return items[0]
    return None

def load_last_ts():
    try:
        with open(CACHE_FILE, "r") as f:
            return f.read().strip()
    except FileNotFoundError:
        return ""

def save_ts(ts):
    with open(CACHE_FILE, "w") as f:
        f.write(ts)

def send_kakao_message(msg):
    url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"
    headers = {"Authorization": f"Bearer {KAKAO_TOKEN}"}
    data = {
        "template_object": json.dumps({
            "object_type": "text",
            "text": msg,
            "link": {"web_url": "https://nedrug.mfds.go.kr/pbp/CCBAI01"}
        })
    }
    response = httpx.post(url, headers=headers, data=data)
    print("Kakao 응답:", response.status_code, response.text)

# === 실행 ===
recall = get_latest_recall()
if recall:
    current_ts = recall.get("PRDT_UPDATE_DATE") or recall.get("LAST_UPDATE_DATE") or recall.get("REGISTER_DATE")
    last_ts = load_last_ts()

    if current_ts and current_ts != last_ts:
        msg = f"""📢 [회수공고 알림]
{recall.get("ITEM_NAME")} ({recall.get("ENTP_NAME")})
📅 {recall.get("PRDT_PRMS_DT")}
📝 {recall.get("RECALL_REASON")}"""
        send_kakao_message(msg)
        save_ts(current_ts)
    else:
        print("✅ 새 공고 없음")
else:
    print("❌ 회수 정보 가져오기 실패")
