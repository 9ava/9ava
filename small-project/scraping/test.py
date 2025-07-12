import requests

url = "https://apis.data.go.kr/1611000/BldRtltrRcvStatsService/getPreSaleTradeStats"
params = {
    'serviceKey': 'db3aa3d088664d1c84dcfa678b35cf3a',
    'LAWD_CD': '11',
    'DEAL_YMD': '202405',
    'numOfRows': '10',
    'pageNo': '1',
    '_type': 'json'
}

response = requests.get(url, params=params)
data = response.json()

for item in data['response']['body']['items']['item']:
    print(f"{item['SIDO_NM']} {item['SGG_NM']} - {item['DEAL_CNT']}건")
