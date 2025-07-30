# 8주차: RESTful API

## 1. RESTful API의 개념과 설계

### 1.1. REST란?

REST(REpresentational State Transfer)는 월드 와이드 웹과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처 스타일의 한 종류입니다. REST는 웹의 기존 기술과 프로토콜을 그대로 활용하므로 웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일입니다.

- **자원(Resource):** URI로 식별되는 모든 것 (문서, 이미지, 데이터 등)
- **표현(Representation):** 자원의 상태를 나타내는 것 (JSON, XML, HTML 등)
- **행위(Verb):** HTTP 메서드를 이용해 자원에 대한 작업을 수행하는 것 (GET, POST, PUT, DELETE 등)

### 1.2. REST의 6가지 원칙

1.  **클라이언트-서버(Client-Server):** 클라이언트와 서버의 역할을 명확히 분리하여 서로 독립적으로 개발 및 확장될 수 있도록 합니다.
2.  **무상태성(Stateless):** 서버는 클라이언트의 상태를 저장하지 않습니다. 각 요청은 독립적으로 처리되어야 하며, 필요한 모든 정보를 담고 있어야 합니다.
3.  **캐시 가능(Cacheable):** 클라이언트는 서버의 응답을 캐시할 수 있어야 합니다. 이를 통해 성능을 향상시키고 서버의 부하를 줄일 수 있습니다.
4.  **계층화 시스템(Layered System):** 클라이언트는 서버와 직접 통신하는지, 중간의 프록시나 로드 밸런서와 통신하는지 알 수 없습니다. 이를 통해 시스템의 유연성과 확장성을 높일 수 있습니다.
5.  **일관된 인터페이스(Uniform Interface):** URI로 식별된 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말합니다.
6.  **자체 표현 구조(Self-descriptiveness):** REST API 메시지만 보고도 이를 쉽게 이해할 수 있는 자체 표현 구조로 되어 있다는 것입니다.

### 1.3. HTTP 메서드

- **GET:** 리소스를 조회합니다.
- **POST:** 리소스를 생성합니다.
- **PUT:** 리소스를 전체 수정합니다.
- **PATCH:** 리소스를 부분적으로 수정합니다.
- **DELETE:** 리소스를 삭제합니다.

## 2. RESTful 엔드포인트 설계 방법

- **URI는 리소스를 표현해야 합니다.** 동사보다는 명사를 사용하고, 리소스는 복수형으로 표현하는 것이 좋습니다. (예: `GET /users/1`)
- **URI에는 하이픈(-)**을 사용하여 가독성을 높입니다.
- **URI는 소문자를 사용**합니다.
- **파일 확장자는 URI에 포함하지 않습니다.** 대신 `Content-Type` 헤더를 사용하여 데이터 형식을 지정합니다.
- **API 버전을 명시**하는 것이 좋습니다. (예: `/v1/users`)

## 3. Express/MongoDB 기반 REST API 예제

다음은 Express.js와 MongoDB를 사용하여 간단한 사용자 관리 REST API를 구현한 예제입니다.

### 3.1. 프로젝트 설정

```bash
mkdir express-mongo-api
cd express-mongo-api
npm init -y
npm install express mongoose
```

### 3.2. 소스 코드

**`server.js`**

```javascript
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect("mongodb://localhost:27017/my-rest-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// --- API Endpoints ---

// GET /users - 모든 사용자 조회
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id - 특정 사용자 조회
app.get("/users/:id", getUser, (req, res) => {
  res.json(res.user);
});

// POST /users - 새로운 사용자 생성
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id - 사용자 정보 전체 수정
app.put("/users/:id", getUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /users/:id - 사용자 정보 부분 수정
app.patch("/users/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id - 사용자 삭제
app.delete("/users/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 미들웨어 - ID로 사용자 찾기
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 3.3. API 테스트

`curl`이나 Postman과 같은 도구를 사용하여 API를 테스트할 수 있습니다.

- **사용자 생성 (POST):**

  ```bash
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com"}'
  ```

- **모든 사용자 조회 (GET):**

  ```bash
  curl http://localhost:3000/users
  ```

- **특정 사용자 조회 (GET):**

  ```bash
  curl http://localhost:3000/users/{userId}
  ```

- **사용자 수정 (PATCH):**

  ```bash
  curl -X PATCH http://localhost:3000/users/{userId} -H "Content-Type: application/json" -d '{"name": "Jane Doe"}'
  ```

- **사용자 삭제 (DELETE):**
  ```bash
  curl -X DELETE http://localhost:3000/users/{userId}
  ```
