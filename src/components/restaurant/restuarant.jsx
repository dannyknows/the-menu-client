import React, { Component } from "react";
import "../../App.scss";

// components
import Nav from "./nav";
import Menu from "./menu";

export default class Restaurant extends Component {
  render() {
    const { menus, theme, styles, name } = this.props[0];
    console.log(this.props);
    return (
      <>
        <Nav menus={menus} name={name} style={styles}/>
        <div id="menus">
          {menus &&
            menus.map((menu) => {
              return <Menu menu={menu} />;
            })}
        </div>
      </>
    );
  }
}
