import QuotationCard from "./components/quotationCard";
import ApplyScrapPage from "./pages/ApplyScrapPage";
import GreetingPage from "./pages/GreetingPage";
import QuotationPage from "./pages/QuotationPage";
import ScrapCompletePage from "./pages/ScrapCompletePage";
import { useState } from "react";

function App() {
  const [stage, setStage] = useState(1);
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  const prevStage = () => {
    setStage(stage - 1);
  };
  const nextStage = () => {
    setStage(stage + 1);
  };
  const countUp = () => {
    setCount(count + 1);
  };
  const randomNum = () => {
    setNum(Math.floor(Math.random() * 100));
  };

  const resetNum = () => {};
  return (
    <div>
      <button
        className="p-4 m-4 text-white bg-green-500 rounded"
        onClick={randomNum}
      >
        랜덤 숫자 생성
      </button>
      <p>숫자: {num}</p>

      <button className="p-4 m-4 bg-blue-500" onClick={countUp}>
        카운트 증가 &nbsp;
        {count}
      </button>
      <button className="p-4 m-4 bg-blue-500" onClick={prevStage}>
        이전
      </button>
      <button className="p-4 m-4 bg-blue-500" onClick={nextStage}>
        다음
      </button>
      {stage === 1 && <GreetingPage />}
      {stage === 2 && <ApplyScrapPage />}
      {stage === 3 && <QuotationPage />}
      {stage === 4 && <ScrapCompletePage />}
      {/* <GreetingPage />
      <ApplyScrapPage /> */}
      {/* <QuotationPage /> */}

      <ScrapCompletePage />
    </div>
  );
}

export default App;
