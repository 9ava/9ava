import { Component } from "react";
import ClassComponent from "./ClassComponent";
import OnClick from "./pages/OnClick";

export default class App extends Component {
  render() {
    return (
      <>
        <ul>
          <ClassComponent href="https://www.google.com" text="go to Google" />
          <ClassComponent href="https://www.twitter.com" text="go to Twitter" />
        </ul>
        <OnClick />
      </>
    );
  }
}
