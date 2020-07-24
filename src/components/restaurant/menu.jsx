import React, { Component } from "react";

// components
import Item from "./item";

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

// className={theme.theme_class}
  render() {
    const { title, items, styles, theme } = this.props.menu;
    console.log(this.props)
    return (
      <div  id={`${title}`}>
        <h1>{title}</h1>
        <div>
          {items &&
            items.map((item) => {
              return <Item item={item} />
            })}
        </div>
      </div>
    );
  }
}
