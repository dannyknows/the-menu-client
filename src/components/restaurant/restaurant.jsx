import React, { Component } from "react";
import Buffer from "../buffer";
import "../../App.scss";
import styled from "styled-components";
// components
// import Nav from "./nav";
import Menu from "./menu";

const RestaurantStyle = styled.div`
  background: ${(props) => props.background || "white"};
  width: 100%;
  color: ${(props) => props.color || "white"};
  padding: 5%;
  border: none;
  .foreground {
    background: ${(props) => props.foreground || "white"};
    width: 90%;
  }
  h1 {
    color: ${(props) => props.header || "black"};
    text-align: center;
    font-size: 6rem;
  }
`;

export default class Restaurant extends Component {
  state = { subdomain: this.props.match.params.subdomain, restaurant: [] };

  async componentDidMount() {
    const { subdomain } = this.state;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getrestaurants/${subdomain}`
    );
    const json_response = await response.json();
    console.log(json_response);
    this.setState({ restaurant: json_response.restaurant });
  }

  renderRestaurant(restaurant) {
    const { name, menus, contact_infos, style } = restaurant;
    console.log(style);
    if (restaurant.style) {
      const { style_data } = restaurant.style;
      const styleData = JSON.parse(style_data);
      return (
        <RestaurantStyle
          background={styleData.background}
          foreground={styleData.color}
          color={styleData.color}
          header={styleData.header}
          border={styleData.border}
        >
          <div className="foreground">
            <h1>{restaurant.name}</h1>
            <hr />
            {contact_infos && contact_infos.map((contactInfo,ciIndex) => {
                return <div key={ciIndex}>{contactInfo.name}: {contactInfo.info}</div>
            })}
            {/* <Nav menus={menus} name={name} style={styles}/> */}
            <div id="menus">
              {menus &&
                menus.map((menu) => {
                  return <div> {menu} </div>;
                })}
            </div>
          </div>
        </RestaurantStyle>
      );
    } else {
      return <div>FAILED</div>;
    }
  }

  render() {
    const { restaurant } = this.state;
    return restaurant ? this.renderRestaurant(restaurant) : <Buffer />;
  }
}
