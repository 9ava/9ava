import React, { useLayoutEffect, useRef } from "react";

function LayoutEffectExample() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (boxRef.current instanceof HTMLElement) {
      boxRef.current.style.background = "yellow";
      boxRef.current.style.width = "300px";
    }
  }, []);
  return <div ref={boxRef}>useLayoutEffect로 스타일 적용 </div>;
}
