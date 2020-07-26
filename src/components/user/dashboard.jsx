import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../../context/restaurants-context";
import UserRestaurants from "./UserRestaurants";
import Banner from '../shared/Banner'

class Dashboard extends Component {
  static contextType = RestaurantsContext;
  state = {
    width: window.innerWidth,
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  async getRestaurants(){
    try {
      const response = await fetch("http://localhost:3000/restaurants", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const { jwt, restaurants } = await response.json();
        // localStorage.setItem('token', jwt)
        const token = localStorage.getItem("token");
        const auth = localStorage.getItem("auth");
        this.context.dispatch("populate", restaurants);
        this.setState({
          auth: true,
          loading: false,
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    this.context.dispatch();
    return (
      <div>
        <Banner>Welcome Back</Banner>
        <div>
          <h2>Account</h2>
          <div>
            <h4>NAME</h4>
            <h4>Email</h4>
            <button>Edit</button>
          </div>
        </div>
        <hr />
        <h2>Restaurants</h2>
        <UserRestaurants getRestaurants={this.getRestaurants}/>
        <Link to="/dashboard/new">Add a New Restaurant</Link>
      </div>
    );
  }
}

export default Dashboard;