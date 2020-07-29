import React from "react";
import EditableField from "../shared/EditableField";
import { RestaurantsContext } from "../../context/restaurants-context";

class Ingredients extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    menu: this.props.menu,
    item: this.props.item,
    new_ingredient_name: "",
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  updateIngredient = async (new_name, id) => {
    const body = {
      ingredient: {
        name: new_name,
      },
    };
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/items/${this.state.item.id}/ingredients/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    this.context.dispatch("edit ingredient", {
      menu: this.state.menu,
      item: this.state.item,
      ingredient_id: id,
      new_name: new_name
    });
  };
  ingredientSubmit = async (event) => {
    event.preventDefault();
    const body = {
      ingredient: {
        name: this.state.new_ingredient_name,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/items/${this.state.item.id}/ingredients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    const newIngredient = await response.json();
    document.getElementById("ingredient_form").reset();
    this.context.dispatch("new ingredient", {
      item: this.state.item,
      menu: this.state.menu,
      ingredient: newIngredient,
    });

  };

  deleteIngredient = async (ingredient, ingredient_index) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/items/${ingredient.item_id}/ingredients/${ingredient.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.context.dispatch("remove ingredient", {
      item: this.state.item,
      menu: this.state.menu,
      ingredient_index: ingredient_index
    });
    // this.state.restaurant.menus.splice(index, 1);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.item.ingredients.map((ingredient, ingredient_index) => {
            return (
              <li key={ingredient_index}>
                <EditableField
                  inputStyle="text"
                  input={ingredient.name}
                  updateField={this.updateIngredient}
                  id={ingredient.id}
                />
                <button onClick={() => this.deleteIngredient(ingredient, ingredient_index)}>Delete</button>
              </li>
            );
          })}
        </ul>
        <form id="ingredient_form" onSubmit={this.ingredientSubmit}>
          <input
            type="text"
            name="new_ingredient_name"
            id="new_ingredient_name"
            placeholder="Name"
            onChange={this.onInputChange}
          />
          <input type="submit" value="Add Ingredient" />
        </form>
      </div>
    );
  }
}

export default Ingredients;
