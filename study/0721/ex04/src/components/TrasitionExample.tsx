import React, { useState, useTransition } from "react";

export default function TransitionExample() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    startTransition(() => {
      const items: string[] = [];
      for (let i = 0; i < 10000; i++) {
        items.push(e.target.value);
      }
      setList(items);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <span>로딩 중...</span>}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li> // 리스트도 보여줍니다
        ))}
      </ul>
    </div>
  );
}
