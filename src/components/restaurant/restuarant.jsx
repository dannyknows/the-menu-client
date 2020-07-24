import React, { Component } from "react";
import "../../App.scss";

// components
// import Nav from "./nav";
import Menu from "./menu";

export default class Restaurant extends Component {
  state = { subdomain: this.props.match.params.subdomain , restaurant:""};
  async componentDidMount() {
    const { subdomain } = this.state;
    const response = await fetch(
      `http://localhost:3000/getrestaurants/${subdomain}`
    );
    const json_response = await response.json();
    this.setState({restaurant: json_response.restaurant});
  }

  renderRestaurant(restaurant){
    const {name, menus, styles} = restaurant  
    return(
      <>
        {/* <Nav menus={menus} name={name} style={styles}/> */}
        <div id="menus">
          {menus &&
            menus.map((menu) => {
              return <Menu menu={menu} />;
          })}
        </div>
      </>
    )
  }

  render() {
    const { restaurant }  = this.state
    console.log(restaurant);
    return restaurant ? this.renderRestaurant( restaurant ) : (<h1>No data</h1>);
  }
}
