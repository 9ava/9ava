# 5주차 과제: 프로그래밍 아키텍처 패턴 비교

## ✅ 1. MVC (Model-View-Controller)

### 🧱 구조
- **Model**: 데이터와 비즈니스 로직을 관리
- **View**: 사용자에게 보여지는 UI
- **Controller**: 사용자 입력을 받아 처리하고 Model 또는 View를 업데이트

### 🔍 특징
- 사용자 입력은 **Controller**를 통해 처리됨
- **View와 Model이 분리**되어 있어 유지보수가 쉬움
- Controller가 양쪽(Model ↔ View)을 중재

### 💡 예시 (JavaScript 예제)
```javascript
// Model
class Model {
  constructor() {
    this.data = "Hello";
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}

// View
class View {
  render(data) {
    console.log("View:", data);
  }
}

// Controller
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  updateView() {
    const data = this.model.getData();
    this.view.render(data);
  }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
controller.updateView();
```

---

## ✅ 2. MVP (Model-View-Presenter)

### 🧱 구조
- **Model**: 데이터 처리 및 비즈니스 로직
- **View**: UI 담당 (Passive View)
- **Presenter**: View와 Model 사이의 중개자

### 🔍 특징
- **View는 Presenter에게 모든 동작을 위임**
- View는 인터페이스로 정의되어 테스트 가능
- **양방향 통신** (Presenter ↔ Model, Presenter ↔ View)

### 💡 예시 (JavaScript 스타일 MVP)
```javascript
// Model
class Model {
  getMessage() {
    return "Hello from Model";
  }
}

// View
class View {
  showMessage(message) {
    console.log("View:", message);
  }
}

// Presenter
class Presenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize() {
    const message = this.model.getMessage();
    this.view.showMessage(message);
  }
}

const model = new Model();
const view = new View();
const presenter = new Presenter(view, model);
presenter.initialize();
```

---

## ✅ 3. MVVM (Model-View-ViewModel)

### 🧱 구조
- **Model**: 비즈니스 로직과 데이터
- **View**: UI 화면
- **ViewModel**: View의 상태 및 로직 담당

### 🔍 특징
- **데이터 바인딩(Data Binding)**을 통해 View와 ViewModel이 자동 연결됨
- View는 ViewModel의 속성만 바인딩하고 직접 로직을 가지지 않음
- **ViewModel은 View를 모름**

### 💡 예시 (Vue.js 유사 코드)
```javascript
// ViewModel
const viewModel = {
  data: {
    message: "Hello MVVM"
  },
  updateMessage(newMessage) {
    this.data.message = newMessage;
  }
};

// View (Vue Template)
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: viewModel.data.message
    };
  }
};
</script>
```

---

## 📊 비교 요약 표

| 항목            | MVC                            | MVP                             | MVVM                            |
|-----------------|----------------------------------|----------------------------------|----------------------------------|
| 중재자 역할     | Controller                      | Presenter                        | ViewModel                       |
| View가 로직을 아는가? | 약간 (Controller에 의존)        | 거의 없음 (Presenter에 위임)   | 없음 (ViewModel에 바인딩)     |
| 테스트 용이성    | 보통                            | 높음                             | 높음                            |
| 주 사용 환경     | 웹 (Spring, Django)            | 안드로이드(Java)                | WPF, Android(Kotlin), Vue 등    |
| View와의 연결   | 수동                            | 수동                             | **자동(Data Binding)**          |