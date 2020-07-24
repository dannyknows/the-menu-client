import React, { Component } from "react";

// components
import Bold from "./itemComponents/bold";

export default class Menu extends Component {
  render() {
    const { title, items, styles, theme } = this.props.menu;
    console.log(this.props);
    return (
      <div id={`${title}`}>
        <h1>{title}</h1>
        <div>
          {items &&
            items.map((item) => {
              // switch (item.theme.theme_class) {
              // UNCOMMENT FOR PRODUCTION
              switch ("bold") {
                case "bold":
                  return <Bold item={item} />;
                default:
                  return "default";
              }
            })}
        </div>
      </div>
    );
  }
}
