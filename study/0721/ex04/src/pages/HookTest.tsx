import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useRef,
  createContext,
  TransitionEvent,
} from "react";

// 1. Reducer for useReducer hook
const initialState = { count: 0 };

function reducer(state: { count: number }, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

// 2. Context for useContext hook
const ThemeContext = createContext("light");

// Main Component
const HookTest = () => {
  // 3. useState
  const [text, setText] = useState("");

  // 4. useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 5. useEffect
  useEffect(() => {
    document.title = `Count is ${state.count}`;
    console.log("useEffect triggered: document title updated.");

    return () => {
      console.log(
        "useEffect cleanup: component will unmount or count will change."
      );
    };
  }, [state.count]);

  // 6. useContext
  const theme = useContext(ThemeContext);

  // 7. useRef
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputEl.current) {
      inputEl.current.focus();
      console.log("useRef: Focused the input element.");
    }
  };

  // 8. useCallback
  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
    console.log("useCallback: handleReset function was called.");
  }, []);

  return (
    <div
      className={`p-6 m-4 border rounded-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="mb-4 text-2xl font-bold">React Hooks Demonstration</h1>

      {/* useState Example */}
      <div className="p-4 mb-4 border rounded">
        <h2 className="text-xl font-semibold">useState</h2>
        <input
          ref={inputEl}
          className="w-full p-2 text-black border rounded"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something here..."
        />
        <p className="mt-2">Current Text: {text}</p>
      </div>

      {/* useReducer Example */}
      <div className="p-4 mb-4 border rounded">
        <h2 className="text-xl font-semibold">useReducer</h2>
        <p>Count: {state.count}</p>
        <button
          className="mr-2 btn btn-primary"
          onClick={() => dispatch({ type: "increment" })}
        >
          Increment
        </button>
        <button
          className="mr-2 btn btn-secondary"
          onClick={() => dispatch({ type: "decrement" })}
        >
          Decrement
        </button>
        <button className="btn btn-accent" onClick={handleReset}>
          Reset (useCallback)
        </button>
      </div>

      {/* useRef Example */}
      <div className="p-4 mb-4 border rounded">
        <h2 className="text-xl font-semibold">useRef</h2>
        <p>
          Click the button to focus the input field in the useState section.
        </p>
        <button className="btn btn-info" onClick={onButtonClick}>
          Focus Input
        </button>
      </div>

      {/* useContext Example */}
      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold">useContext</h2>
        <p>
          Current theme from context is:{" "}
          <span className="font-bold">{theme}</span>
        </p>
      </div>
    </div>
  );
};

// Wrapper component to provide context
const HookTestPage = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="p-4">
        <button className="mb-4 btn" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <HookTest />
      </div>
    </ThemeContext.Provider>
  );
};

export default HookTestPage;
