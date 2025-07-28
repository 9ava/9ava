# ✅ 3주차 과제 정리 (6.23 \~ 6.29)

## 📌 주제: 웹 요청과 응답의 본질 이해하기

### 항목:

* HTTP의 request/response 구조
* Ajax
* forward, redirect 차이

---

## 1. HTTP의 Request / Response 구조

### 📟 Request (요청)

클라이언트(브라우저)가 서버에 보내는 메시지
구성 요소:

* **Method (메서드)**: `GET`, `POST`, `PUT`, `DELETE` 등
* **URL (경로)**: 요청 대상 자원 위치
* **Header**: 사용자 정보, 인증, 캐시 등 포함
* **Body**: 주로 `POST` 요청 시 포함 (form data, JSON 등)

예시:

```http
GET /login HTTP/1.1
Host: example.com
User-Agent: Chrome/120.0
Accept: text/html
```

---

### 📨 Response (응답)

서버가 클라이언트의 요청에 대해 반환하는 메시지
구성 요소:

* **Status Code (상태 코드)**: `200 OK`, `404 Not Found`, `500 Internal Server Error` 등
* **Header**: 응답 타입, 길이, 쿠키 등 포함
* **Body**: HTML, JSON, 이미지 등 실질적인 데이터

예시:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<html>...</html>
```

---

## 2. Ajax (Asynchronous JavaScript and XML)

### ✨ 정의

웹 페이지 전체를 새로고침하지 않고도, 백그라운드에서 서버와 **비동기 통신**하여 데이터를 주고받는 기술.

### ✅ 특징

* 비동기 요청 → 사용자 경험 향상
* HTML 전체가 아니라 JSON, XML 등 데이터만 교환
* 주로 `fetch` 또는 `XMLHttpRequest`로 구현

### 💡 예시 (fetch 사용)

```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

---

## 3. Forward vs Redirect 차이

| 구매     | Forward          | Redirect               |
| ------ | ---------------- | ---------------------- |
| 정의     | 서버 내부에서 요청 전달    | 클라이언트에게 새 URL로 이동 지시   |
| 주소창 변화 | ❌ 변화 없음          | ✅ 주소 변경됨               |
| 요청 횟수  | 1회 (서버 내부 처리)    | 2회 (클라이언트 → 서버 → 새 요청) |
| 사용 목적  | 내부 자원 공유, 데이터 유지 | 새 경로로 이동, 새 요청 유도      |
| 예시 사용  | 로그인 후 내부 페이지 이동  | 게시글 작성 후 목록 페이지로 이동    |

---