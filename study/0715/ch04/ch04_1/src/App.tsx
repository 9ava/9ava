import { useClock } from "./hooks";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Clock from "./pages/Clock";

// export default function App() {
// const [today, setToday] = useState(new Date());
// let today = useRef(new Date());
// useEffect(() => {
//   console.log(`useEffect called.`);
//   const duration = 1000;
//   const id = setInterval(() => {
//     setToday(new Date());
// today.current = new Date();
//   console.log(`today.current`, today.current.toLocaleTimeString());
//   }, duration);
//   return () => clearInterval(id);
// }, []);

export default function App() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  return (
    <div>
      <h2>{"덧셈기"}</h2>
      <input
        type="number"
        value={number1}
        onChange={(e) => setNumber1(parseInt(e.target.value))}
      />
      <span>{"+"}</span>
      <input
        type="number"
        value={number2}
        onChange={(e) => setNumber2(parseInt(e.target.value))}
      />

      <p>{`덧셈 결과는 : ${number1} + ${number2} = ${number1 + number2}`}</p>
    </div>
  );
  // const today = useClock();
  // return <Clock today={today} />;
}
