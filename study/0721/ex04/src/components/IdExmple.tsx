import React, { useId, useState } from "react";

export default function IdExample() {
  const [name, setName] = useState("");
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>
        id: {id}
        이름:
      </label>
      <input
        id={id}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
