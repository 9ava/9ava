import os
import json
import subprocess
from dotenv import load_dotenv

load_dotenv()

SERVICE_KEY = os.getenv("SERVICE_KEY")

API_URL = f"https://apis.data.go.kr/1471000/MdcinRtrvlSleStpgeInfoService04?serviceKey={SERVICE_KEY}&pageNo=1&numOfRows=1&_type=json"

def get_latest_recall():
    try:
        result = subprocess.check_output(["curl", "-s", API_URL])
        data = json.loads(result.decode("utf-8"))
        items = data.get("response", {}).get("body", {}).get("items", [])
        if items:
            return items[0]
        return None
    except Exception as e:
        print("❌ API 호출 실패:", e)
        return None

# 실행
recall = get_latest_recall()
if recall:
    print("✅ 회수 정보:")
    print(json.dumps(recall, indent=2, ensure_ascii=False))
else:
    print("❌ 회수 정보 없음")
