# 2주차 과제 (6.16 ~ 6.22)  
## 주제: 3계층 구조와 CRUD 작동 흐름 조사

---

## 1. 3-Tier Architecture (3계층 구조)

3계층 아키텍처는 소프트웨어를 다음과 같이 세 개의 계층으로 나누어 구성하는 구조입니다:

### 1) 프레젠테이션 계층 (Presentation Layer)
- 사용자가 직접 상호작용하는 UI(User Interface)
- 예: HTML, CSS, JavaScript, React 등
- 역할: 사용자로부터 입력을 받고, 데이터를 출력해줌

### 2) 비즈니스 로직 계층 (Business Logic Layer)
- 핵심 로직을 처리하는 계층 (Controller, Service 등)
- 예: Java, Python, Node.js 백엔드 로직
- 역할: 입력 데이터를 처리하고, 규칙에 따라 판단하여 결과를 도출함

### 3) 데이터 접근 계층 (Data Access Layer)
- 데이터베이스와 직접 소통하는 계층
- 예: SQL, ORM (Sequelize, Hibernate 등)
- 역할: 데이터를 저장하고 불러오는 역할 수행

> 이 구조는 유지보수성과 확장성을 높이고, 역할 분담을 명확히 하여 협업에 유리함.

---

## 2. CRUD 개념과 웹 작동 흐름

### 1) CRUD란?
CRUD는 데이터 처리의 기본 4가지 동작을 의미합니다:

| 약어 | 동작 | 설명 | HTTP 메서드 | 예시 |
|------|------|------|--------------|------|
| C | Create | 데이터 생성 | POST | 회원가입 |
| R | Read | 데이터 조회 | GET | 게시글 보기 |
| U | Update | 데이터 수정 | PUT / PATCH | 게시글 수정 |
| D | Delete | 데이터 삭제 | DELETE | 게시글 삭제 |

---

### 2) 웹에서의 CRUD 작동 흐름

웹 애플리케이션에서는 다음과 같은 흐름으로 CRUD가 이루어집니다:

1. **사용자 입력 (프론트엔드)**
   - 사용자가 버튼을 클릭하거나 폼을 제출함
2. **요청 전송 (HTTP 요청)**
   - 프론트엔드 → 백엔드로 HTTP 요청 전송 (예: POST /api/users)
3. **비즈니스 로직 처리 (서버)**
   - 컨트롤러가 요청을 받고, 서비스에서 로직 처리
4. **DB와 통신 (모델 또는 DAO)**
   - 필요한 데이터를 DB에서 조회하거나 저장함
5. **응답 전송**
   - 처리 결과를 프론트엔드에 JSON 형태로 반환
6. **UI 반영**
   - 응답 데이터를 화면에 렌더링하여 사용자에게 보여줌

> 예: 사용자가 회원가입 폼 작성 → 제출 → 서버에서 데이터 저장 → 성공 메시지 응답 → 가입 완료 화면 표시

---

## 참고 자료
- [위키백과 - 3계층 아키텍처](https://ko.wikipedia.org/wiki/3계층_소프트웨어_아키텍처)
- [CRUD 설명 블로그](https://developer.mozilla.org/ko/docs/Glossary/CRUD)
- [REST API와 CRUD 관계](https://restfulapi.net/)
