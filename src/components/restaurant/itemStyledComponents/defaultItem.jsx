import React, { Component } from "react";
import styled from "styled-components";

const ItemDiv = styled.div`
  width: 200px;
  margin: 1em;
  padding: 0.5em;
  border: 1px solid black;
  margin-bottom: 20px;
  h3 {
    text-align: center;
    margin: 5px;
    margin-left: 0px;
  }
  span {
    margin-right: 10px;
  }
  p {
    margin: 1px;
    padding-left: 6px;
  }
  h4 {
    margin: 0px;
  }
`;

class Default extends Component {
  render() {
    const { name, ingredients, sizes, tags, description } = this.props.item;
    return (
      <ItemDiv>
        {/* {WHEN IMAGE EXISTS} */}
        <div>
          <h3>{name}</h3>
          <>
            {sizes &&
              sizes.map((size, index) => {
                return (
                  <span key={index}>
                    <b>
                      ${(size.price / 1000).toFixed(2)} {size.name}
                    </b>
                  </span>
                );
              })}
          </>
          <p>
            {description && <b>Description: </b>}
            {description}
          </p>
          <p>
            {ingredients && <b>Ingredients: </b>}
            {ingredients &&
              ingredients
                .map((ind) => {
                  return ind.name;
                })
                .join(", ")}
          </p>
          <h4>
            {tags &&
              tags.map((item) => {
                return item.name;
              })}
          </h4>
        </div>
      </ItemDiv>
    );
  }
}

export default Default;
