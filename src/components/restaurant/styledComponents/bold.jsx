import React, { Component }  from "react";
import styled from "styled-components";

const ItemDiv = styled.div`
  border: solid 1px black;
  font-size: 1.5em;
  margin-bottom: 2px;
  box-shadow: 5px 5px 15px rgba(grey, 0.5);
  border-radius: 10px;
  .image {
    color: white;
  }
`;

class Bold extends Component {
  render() {
    const { name, ingredients, sizes, styles, themes, tags } = this.props.item;
    return (
      <ItemDiv>
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
      </ItemDiv>
    );
  }
}

export default Bold;
