import React, { Component } from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import Item from "./Item";

export default class ItemPopUp extends Component {
  static contextType = RestaurantsContext;
  state = {
    new_item_name: "",
    new_item_description: "",
    restaurants: this.context.restaurants
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  itemSubmit = async (event) => {
    event.preventDefault();
    const { new_item_name, new_item_description } = this.state;
    const body = {
      item: {
        name: new_item_name,
        description: new_item_description,
      },
      menu_id: this.props.current_menu.id,
    };
    console.log(body.item.description)
    try {
      const response = await fetch(`http://localhost:3000/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body)
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const newItem = await response.json();
        console.log(newItem);
        this.context.dispatch("new item", { current_menu: this.props.current_menu, item: {...newItem, sizes: [], ingredients: []}, menu_index:this.props.menu_index});
        this.setState({restaurants: this.context.restaurants});
        document.getElementById("item_form").reset();
        this.props.toggle();
        this.props.updateState();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  handleClick = () => {
    this.props.toggle();
  };
  render() {
    const { email, password, full_name } = this.state;
    return this.props.item ? (
      <div>

      </div>
    ) : (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;{" "}
          </span>
          <div>
            <form id="item_form" onSubmit={this.itemSubmit}>
              <label htmlFor="new_item_name">Item Name:</label>
              <input
                type="text"
                name="new_item_name"
                id="new_item_name"
                placeholder="Item Name"
                onChange={this.onInputChange}
              />
              <label htmlFor="new_item_description">Description:</label>
              <textarea
                name="new_item_description"
                id="new_item_description"
                cols="30"
                rows="10"
                onChange={this.onInputChange}
              ></textarea>
              <input type="submit" value="Add Item" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
