import React from "react";
//themes
import Default from "./menuStyledComponents/defaultMenu";

const Menu = (props) => {
  // UNCOMMENT FOR PRODUCTION
  // switch (props.menu.theme.theme_class) {
  switch ("DEVELOPMENT") {
    case "bold":
      return;
    case "minimal":
      return;
    default:
      return <Default menu={props.menu}/>;
  }
};

export default Menu;
