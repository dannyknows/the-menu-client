import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, ingredients, sizes, styles, themes, tags } = this.props.item;
    return (
      <div>
        <div className="image">image goes here</div>
        <div>
          <h1>{name && name}</h1>
          <p>
            {tags &&
              tags.map((item) => {
                return item.name;
              })}
          </p>
          <p>
            {ingredients.length > 0 &&
              "Ingredients: " +
                ingredients
                  .map((ind) => {
                    return ind.name;
                  })
                  .join(", ")}
          </p>
        </div>
      </div>
    );
  }
}
