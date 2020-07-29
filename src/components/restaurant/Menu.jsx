import React from "react";
import EditableField from "../shared/EditableField";
import { RestaurantsContext } from "../../context/restaurants-context";
import ItemPopUp from "../user/ItemPopUp";

class Menu extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    restaurant: { ...this.props.restaurant, menus: [] },
    edit_menu: "",
    new_menu_title: null,
    seen: false,
    item: null,
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  menuSubmit = async (event) => {
    event.preventDefault();
    const body = {
      menu: {
        title: this.state.new_menu_name,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/restaurants/${this.state.restaurant.id}/menus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    const newMenu = await response.json();
    this.context.dispatch("new menu", { ...newMenu, items: [] });
    this.setState((state) => {
      state.restaurant.menus.push({ ...newMenu, items: [] });
      return { restaurant: { ...state.restaurant } };
    });
    document.getElementById("menu_form").reset();
  };

  updateMenu = async (new_title, id) => {
    const body = {
      menu: {
        title: new_title,
      },
    };
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/restaurants/${this.state.restaurant.id}/menus/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    this.context.dispatch("edit menu", {
      restaurant_id: this.state.restaurant.id,
      menu_id: id,
      updated_values: { title: new_title },
    });
    this.setState({ edit_contact_index: "" });
  };

  deleteMenu = async (rest_id, menu_id, index) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/restaurants/${rest_id}/menus/${menu_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.context.dispatch("remove menu", {
      restaurant_id: rest_id,
      menu_id: menu_id,
    });
    this.state.restaurant.menus.splice(index, 1);
    this.setState({ restaurant: { ...this.state.restaurant } });
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
      item: null
    });
  };
  updateState = () => {
    this.setState({
      restaurant: this.context.restaurants.find(
        (restaurant) => restaurant.id === this.state.restaurant.id
      ),
    });
  };
  editItem = (item) => {
    this.setState({
      item: item,
      seen: true
    })
  }

  deleteItem = async (item,item_index,menu_index) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/items/${item.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.context.dispatch("remove item", {
      restaurant_id: this.state.restaurant.id,
      item: item,
      item_index: item_index
    });
    this.state.restaurant.menus[menu_index].items.splice(item_index, 1);
    this.setState({ restaurant: { ...this.state.restaurant } });
  }

  render() {
    return (
      <div>
        {this.state.restaurant.menus.map((menu, index) => {
          return (
            <div key={index} className="menu">
              {this.state.seen ? (
                <ItemPopUp
                  current_menu={menu}
                  menu_index={index}
                  toggle={this.togglePop}
                  updateState={this.updateState}
                  item={this.state.item}
                />
              ) : null}
              <EditableField
                inputStyle="text"
                input={menu.title}
                updateField={this.updateMenu}
                id={menu.id}
              />
              <button
                onClick={() =>
                  this.deleteMenu(menu.restaurant_id, menu.id, index)
                }
              >
                Delete
              </button>
              {menu.items.map((item,item_index) => {
                return (
                <div key={item_index}>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <button onClick={() => this.editItem(item)}>Edit</button>
                  <button onClick={() => this.deleteItem(item,item_index,index)}>Delete</button>
                </div>
                );
              })}
              <button
                onClick={() => {
                  this.togglePop();
                }}
              >
                Add Item
              </button>
            </div>
          );
        })}
        <form id="menu_form" onSubmit={this.menuSubmit}>
          <input
            type="text"
            name="new_menu_name"
            id="new_menu_name"
            placeholder="Title"
            onChange={this.onInputChange}
          />
          <input type="submit" value="Add Menu" />
        </form>
      </div>
    );
  }
}

export default Menu;
