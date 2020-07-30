import React, { Component } from "react";
import Buffer from "../buffer";
import "../../App.scss";
import styled from "styled-components";
import Item from "./item";
// components
// import Nav from "./nav";

const RestaurantStyle = styled.div`
  background: ${(props) => props.background || "white"};
  width: 100%;
  color: ${(props) => props.color || "black"};
  padding: 5%;
  border: none;
  .foreground {
    background: ${(props) => props.foreground || "white"};
    width: 90%;
  }
  h1 {
    color: ${(props) => props.header || "black"};
    text-align: center;
    font-size: 10vw;
  }
`;

const Contacts = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
  .contacts {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    min-width: 100px;
    width: 80%;
    border: 2px solid ${(props) => props.border || "black"};
    padding: 1em;
    margin: 1em;
  }
`;

const MenuStyle = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
  .seperator {
    width: 80vw;
    height: 3px;
    background: black;
  }
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
`;
const ItemsStyle = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export default class Restaurant extends Component {
  state = { subdomain: this.props.match.params.subdomain, restaurant: {} };

  async componentDidMount() {
    const { subdomain } = this.state;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getrestaurants/${subdomain}`
      );
      const json_response = await response.json();
      const restaurant = json_response.restaurant;
      console.log(restaurant);
      this.setState({ restaurant: { ...restaurant } });
    } catch (error) {}
  }

  renderRestaurant(restaurant) {
    const { menus, contact_infos, opening_hours } = restaurant;
    let oh = "";
    if (opening_hours) {
      oh = JSON.parse(opening_hours);
    }
    if (restaurant.style) {
      const { style_data } = restaurant.style;
      const styleData = JSON.parse(style_data);
      console.log(styleData.color, styleData.foreground);
      return (
        <RestaurantStyle
          background={styleData.background}
          foreground={styleData.foreground}
          color={styleData.color}
          header={styleData.header}
          border={styleData.border}
        >
          <div className="foreground">
            <h1>{restaurant.name}</h1>
            <hr />
            {opening_hours && (
              <Contacts>
                <h3>Contact Information</h3>
                <div className="contacts">
                  {oh.opening_hours.map((oh,index) => {
                    return (
                      <div key={index}>
                        <b>{oh.day}</b>: {oh.opening_hours.open_hr}:
                        {oh.opening_hours.open_min}
                        {oh.opening_hours.open_ampm} to{" "}
                        {oh.closing_hours.close_hr}:{oh.closing_hours.close_min}
                        {oh.closing_hours.close_ampm}
                      </div>
                    );
                  })}
                </div>
              </Contacts>
            )}
            {contact_infos && (
              <Contacts>
                <h3>Contact Information</h3>
                <div className="contacts">
                  {contact_infos.map((contactInfo, ciIndex) => {
                    return (
                      <div className="singleContact" key={ciIndex}>
                        <b>{contactInfo.name}</b>: {contactInfo.info}
                      </div>
                    );
                  })}
                </div>
              </Contacts>
            )}

            {/* <Nav menus={menus} name={name} style={styles}/> */}
            {menus &&
              menus.map((menu, index) => {
                return (
                  <MenuStyle key={index}>
                    <h2> {menu.title} </h2>
                    <div className="seperator" />
                    <ItemsStyle>
                      {menu.items &&
                        menu.items.map((item, index) => {
                          return <Item key={index} item={item} />;
                        })}
                    </ItemsStyle>
                  </MenuStyle>
                );
              })}
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
