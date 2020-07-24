import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../../context/restaurants-context";
import UserRestaurants from "./UserRestaurants";

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

  deleteRestaurant = async (id) => {
    console.log("hello");
    await fetch(`http://localhost:3000/restaurants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.getRestaurants();
  };

  render() {
    console.log(this.context);
    this.context.dispatch();
    return (
      <div>
        <h1>Welcome back!</h1>
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
        <UserRestaurants />
        <Link to="/dashboard/new">Add a New Restaurant</Link>
      </div>
    );
  }
}

export default Dashboard;