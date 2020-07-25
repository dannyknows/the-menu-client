import React, { Component } from "react";
import styled from "styled-components";
// components
import Item from "../item";

// NOTES colour scheme (styles) are hard coded, waiting for better props
const MenuDiv = styled.div`
  border: 1px solid ${(props) => props.foreground || "#C4C4C4"};
  margin-bottom: 7px;
  .title {
    background-color: ${(props) => props.foreground || "#C4C4C4"};
    padding: 4px;
    text-align: center;
  }
  .items {
    padding: 7px;
  }
`;

const Menu = (props) => {
  console.log(props.menu.styles);
  const { title, items } = props.menu;
  return (
    <MenuDiv styles={props.menu.styles.styles_data}>
      <div className={"title"} id={`${title}`}>
        <h2>{title}</h2>
      </div>
      <div className={"items"}>
        {items &&
          items.map((item) => {
            return <Item item={item} />;
          })}
      </div>
    </MenuDiv>
  );
};

export default Menu;
