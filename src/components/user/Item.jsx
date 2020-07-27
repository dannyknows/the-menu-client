import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import Banner from "../shared/Banner";
import EditableField from "./EditableField";

class Item extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    item_id: 1,
    itemEdit: false,
    itemTitle: "TEST"
  };

  toggleField = () => {
    this.setState({
      itemEdit: !this.state.itemEdit
    })
  }

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.setState({
        itemEdit: !this.state.itemEdit
      })
    }
  }

  render() {
    return (
      <div>
        <Banner>Item</Banner>
        {/* <title>Item name</title>;
        <h3>Description</h3>
        <p>description placeholder</p>
        <h3>Tags</h3>
        <h3>Sizes</h3>
        <h3>Ingredients</h3>
        <button>Delete Item</button> */}
        <EditableField inputStyle="text" itemTitle={this.state.itemTitle}/>
        {/* {this.state.itemEdit ? (
            <input id="itemTitle" type="text" onKeyPress={this.keyPressed} onChange={this.onInputChange} value={this.state.itemTitle}/>
          ) : (
            <p onClick={this.toggleField}>{this.state.itemTitle}</p>
        )} */}

      </div>
    );
  }
}

export default Item;
