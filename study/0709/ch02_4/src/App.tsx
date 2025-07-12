import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EventListener from "./pages/EventListener";
import ReactOnClick from "./pages/ReactOnClick";
import FileInput from "./pages/FileInput";
import DragDrop from "./pages/DragDrop";

export default function App() {
  // const texts = [<p key="1">hello</p>, <p key="2">world</p>];
  return (
    <div>
      {/* <EventListener /> */}
      {/* <ReactOnClick /> */}
      <DragDrop />
    </div>
  );
}
