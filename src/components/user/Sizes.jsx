import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";

class Sizes extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    item: this.props.item,
    menu: this.props.menu,
    edit_size_index: "",
    edit_name: "",
    edit_price: null,
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
  editSize = (size_index,size) => {
    this.setState({
      edit_size_index: size_index,
      edit_name: size.name,
      edit_price: size.price
    });
  }


  updateSizeSubmit = async (event, size, size_index) => {
    event.preventDefault();
    const body = {
      size: {
        name: this.state.edit_name,
        price: this.state.edit_price
      },
    };

    try {
      const response = await fetch(
        `http://localhost:3000/items/${size.item_id}/sizes/${size.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      const newSize = size;
      newSize.name = this.state.edit_name;
      newSize.price = this.state.edit_price;
      console.log(newSize);
      this.setState({ edit_size_index: ""});
      this.context.dispatch("edit size", {
        menu: this.state.menu,
        item: this.state.item,
        size: newSize,
        size_index: size_index
      });
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  };

  deleteSize = async (size, size_index) => {
    await fetch(
      `http://localhost:3000/items/${size.item_id}/sizes/${size.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.context.dispatch("remove size", {
      item: this.state.item,
      menu: this.state.menu,
      size_index: size_index
    });
    // this.state.restaurant.menus.splice(index, 1);
  }

  render() {
    return (
      <div>
        {this.state.item.sizes.map((size, size_index) => {
          return size_index === this.state.edit_size_index ? (
            <div key={size_index} className="item_sizes">
              <form id="edit_size_form" onSubmit={(event) => {
                this.updateSizeSubmit(event, size, size_index);
              }}>
                <input
                  type="text"
                  name="edit_name"
                  id="edit_name"
                  placeholder="Name"
                  onChange={this.onInputChange}
                  value={this.state.edit_name}
                />
                <input
                  type="number"
                  name="edit_price"
                  id="edit_price"
                  placeholder="Price"
                  step="1"
                  onChange={this.onInputChange}
                  value={this.state.edit_price}
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
              <button onClick={() => this.editSize(size_index, size)}>
                Edit
              </button>
              <button onClick={() => this.deleteSize(size, size_index)}>Delete</button>
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
          <input type="submit" value="Add Size" />
        </form>
      </div>
    );
  }
}

export default Sizes;
