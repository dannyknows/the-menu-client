import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";

class Sizes extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    item: this.props.item,
    menu: this.props.menu,
    edit_size_index: "",
    name: "",
    price: null,
    new_size_name: "",
    new_size_price: 0
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  newSizeSubmit = async (event) => {
    event.preventDefault();
    const body = {
      size: {
        name: this.state.new_size_name,
        price: this.state.new_size_price,
      },
    };
    const response = await fetch(
      `http://localhost:3000/items/${this.state.item.id}/sizes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    const newSize = await response.json();
    document.getElementById("new_size_form").reset();
    this.context.dispatch("new size", {
      size: newSize,
      menu: this.state.menu,
      item: this.state.item
    });
  };
  updateSize = async (event) => {};

  render() {
    return (
      <div>
        {this.state.item.sizes.map((size, size_index) => {
          return size_index === this.state.edit_size_index ? (
            <div key={size_index} className="item_sizes">
              <form id="edit_size_form" onSubmit={this.editContactFormSubmit}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onInputChange}
                  value={this.state.name}
                />
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  step="1"
                  onChange={this.onInputChange}
                  value={this.state.name}
                />
                <input type="submit" value="Save" />
              </form>
            </div>
          ) : (
            <div key={size_index} className="contact_info">
            {console.log(size)}
              <p>
                {size.name} {size.price}
              </p>
              <button onClick={() => this.editContact(size_index, size)}>
                Edit
              </button>
              <button onClick={() => this.deleteContact()}>Delete</button>
            </div>
          );
        })}
        <form id="new_size_form" onSubmit={this.newSizeSubmit}>
          <input
            type="text"
            name="new_size_name"
            id="new_size_name"
            placeholder="Name"
            onChange={this.onInputChange}
            value={this.state.new_name}
          />
          <input
            type="number"
            name="new_size_price"
            id="new_size_price"
            placeholder="Price"
            step="1"
            onChange={this.onInputChange}
            value={this.state.new_price}
          />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default Sizes;
