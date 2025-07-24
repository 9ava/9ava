## 🧩 1. React 기본 훅 (필수)

| 훅 이름       | 설명                                          | 사용 예시                               |
| ------------- | --------------------------------------------- | --------------------------------------- |
| `useState`    | 상태를 저장하고 업데이트                      | `const [count, setCount] = useState(0)` |
| `useEffect`   | 컴포넌트 마운트 후 작업 (비동기, side effect) | API 호출, 구독 설정                     |
| `useRef`      | DOM 요소 참조 / 리렌더 안 되는 변수 저장      | `ref.current`, 포커스 처리 등           |
| `useMemo`     | 계산 결과를 메모이제이션 (성능 최적화)        | 무거운 연산 캐싱                        |
| `useCallback` | 함수를 메모이제이션 (props 최적화용)          | 자식 컴포넌트에 함수 넘길 때            |
| `useContext`  | 전역 상태 공유 (Context API)                  | 테마, 로그인 상태 공유 등               |
| `useReducer`  | 복잡한 상태 로직 분리 (Redux 느낌)            | 여러 상태 묶어 처리할 때                |

---

## 🚏 2. React Router 관련 훅 (v6 이상 기준)

| 훅 이름           | 설명                                          |
| ----------------- | --------------------------------------------- |
| `useNavigate`     | 페이지 이동 (프로그래밍 방식)                 |
| `useParams`       | URL 파라미터 추출 (`/post/:id`)               |
| `useLocation`     | 현재 URL 정보 (`pathname`, `search`, `state`) |
| `useSearchParams` | 쿼리스트링 추출 및 변경 (`?page=2`)           |
| `useResolvedPath` | 상대 경로 → 절대 경로로 변환                  |
| `useMatch`        | 현재 경로가 특정 경로와 일치하는지 확인       |

---

## 🛠️ 3. 기타 자주 사용하는 훅 (유틸성)

| 훅 이름               | 설명                                                             |
| --------------------- | ---------------------------------------------------------------- |
| `useLayoutEffect`     | `useEffect`와 같지만 화면 그리기 전에 실행 (DOM 조작에 적합)     |
| `useImperativeHandle` | `ref`를 통해 부모가 자식 함수 실행 가능 (forwardRef와 함께 사용) |
| `useId`               | 고유한 ID 생성 (폼 label/for 연결 등)                            |
| `useTransition`       | 상태 업데이트를 비동기 트랜지션 처리 (UI 응답성 개선)            |
| `useDeferredValue`    | 입력값을 지연시켜서 처리 (성능 최적화)                           |

---

## 🌿 4. 커스텀 훅 예시 (직접 만들기도 자주 함)

```tsx
// useWindowSize.ts
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}
```

---

## ✅ 어떤 상황에 어떤 훅을 써야 할까?

| 상황                  | 사용하는 훅                          |
| --------------------- | ------------------------------------ |
| 컴포넌트 상태 저장    | `useState`                           |
| 데이터 로딩, API 호출 | `useEffect`                          |
| DOM 직접 접근         | `useRef`, `useLayoutEffect`          |
| 컴포넌트 최적화       | `useMemo`, `useCallback`             |
| 페이지 이동           | `useNavigate`                        |
| 현재 URL 파악         | `useLocation`, `useParams`           |
| 전역 상태             | `useContext` 또는 Redux / Zustand 등 |

---
