import React, { useRef, useImperativeHandle } from "react";

export interface MyComponentRef {
  focusInput: () => void;
}

const MyComponent = React.forwardRef<MyComponentRef>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <div className="p-4 m-4 border border-red-300">
      <input ref={inputRef} className="border border-blue-300" type="text" />
      <button onClick={() => inputRef.current?.focus()}>포커스 주기</button>
    </div>
  );
});

export default MyComponent;
