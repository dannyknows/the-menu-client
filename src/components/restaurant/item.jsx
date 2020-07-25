import React from "react"
// themes
import Default from "./itemStyledComponents/defaultItem"

const Item = (props) => {
  // TODO ajdust item themes
  // switch (props.item.theme) {
  switch ("default") {
    case "bold":
      return;
    case "minimal":
      return;
    default:
      return <Default item={props.item}/>;
  }
};

export default Item;