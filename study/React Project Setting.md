## 설치 명령어

```bash
npx create-react-app my-app --template typescript
cd my-app

# 폰트 및 유틸리티 설치
npm install chance luxon @fontsource/material-icons
npm install -D @types/chance @types/luxon

# TailwindCSS v4 및 DaisyUI 구성
npm install -D tailwindcss@3.4.17 postcss autoprefixer @tailwindcss/postcss daisyui@4.12.12 @tailwindcss/line-clamp

# Redux 패키지 설치
npm i redux @reduxjs/toolkit react-redux
npm i redux-logger redux-thunk react-router-dom
npm i react-dnd react-dnd-html5-backend
npm i --legacy-peer-deps react-beautiful-dnd
npm i -D @types/chance @types/luxon
npm i -D @types/redux-logger @types/redux-thunk
npm i -D @types/react-dnd @types/react-beautiful-dnd

```

## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
```

## postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
