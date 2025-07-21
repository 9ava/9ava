import "./index.css";
import "./App.css";
import ParentComponent from "./components/ParentComponent";
// import HookTestPage from "./pages/HookTest";
// import UseMemoExample from "./components/UseMemoExample";
// import MemoTest from "./pages/MemoTest";
// import UseCallbackExample from "./components/UseCallbackExmaple";
function App() {
  return (
    <div className="App">
      {/* <MemoTest /> */}
      {/* <UseMemoExample /> */}
      {/* <UseCallbackExample /> */}
      {/* <HookTestPage /> */}
      <ParentComponent />
    </div>
  );
}

export default App;
