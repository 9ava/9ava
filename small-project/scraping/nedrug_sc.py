from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import pandas as pd
import time

# 크롬드라이버 경로 지정
driver = webdriver.Chrome()

driver.get("https://nedrug.mfds.go.kr/pbp/CCBAI01")
time.sleep(5)  # 페이지 로딩 대기

# 테이블 요소 가져오기
table = driver.find_element(By.CLASS_NAME, "boardList")
html = table.get_attribute('outerHTML')

# 판다스로 변환
df = pd.read_html(html)[0]
df.to_csv("drug_table.csv", index=False)

driver.quit()
print("표 저장 완료")
