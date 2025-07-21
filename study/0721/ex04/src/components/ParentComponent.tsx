import React, { useRef } from "react";
import CustomInput from "./CustomInput";

// CustomInput 컴포넌트가 노출하는 핸들(메서드)에 대한 타입을 정의합니다.
interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
}

export default function ParentComponent() {
  // useRef의 제네릭 타입으로 HTMLInputElement 대신 CustomInputHandle를 사용합니다.
  const inputRef = useRef<CustomInputHandle>(null);

  return (
    <div className="mt-5">
      <CustomInput ref={inputRef} />
      {/* 이제 inputRef.current는 focus와 clear 메서드를 가집니다. */}
      <button onClick={() => inputRef.current?.focus()}>포커스</button>
      <button onClick={() => inputRef.current?.clear()}>지우기</button>
    </div>
  );
}
