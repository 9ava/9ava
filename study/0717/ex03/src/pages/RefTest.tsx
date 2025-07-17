import MyComponent, { MyComponentRef } from "../components/MyComponent";
import { useRef } from "react";

export default function RefTest() {
  const myComponentRef = useRef<MyComponentRef>(null);

  const handleFocusClick = () => {
    myComponentRef.current?.focusInput();
  };

  return (
    <div>
      <h1>RefTestPage</h1>
      <MyComponent ref={myComponentRef} />
      <MyComponent />
      <MyComponent />
      <button onClick={handleFocusClick}>
        첫 번째 MyComponent에 포커스 주기
      </button>
    </div>
  );
}
