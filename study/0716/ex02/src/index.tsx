import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/material-icons";
import "./index.css";
import App from "./App";
import App2 from "./App2";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <App2 />
  </React.StrictMode>
);
