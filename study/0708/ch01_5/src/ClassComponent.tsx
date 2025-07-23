import { Component } from "react";

export type ClassComponentProps = {
  href: string;
  text: string;
};
export default class ClassComponet extends Component<ClassComponentProps> {
  render() {
    const { href, text } = this.props;
    return (
      <li>
        <a href={href}>
          <p>{text}</p>
        </a>
      </li>
    );
  }
}
