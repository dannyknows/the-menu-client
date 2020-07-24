import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "./dashboard";
import Buffer from "../buffer";
import { RestaurantsContext } from "../../context/restaurants-context";

class ProtectedRoute extends Component {
  static contextType = RestaurantsContext;
  state = {
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    // if (token.length > 75 && auth) {
    //   this.setState({
    //     auth: true,
    //     loading: false,
    //   });
    // } else {
    //   this.setState({
    //     loading: false,
    //   });
    // }
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
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, auth } = this.state;
    console.log(loading, auth);
    if (!loading && !auth) {
      return <Redirect to="/" />;
    } else if (!loading && auth) {
      return <Dashboard />;
    } else {
      return <Buffer />;
    }
  }
}

export default ProtectedRoute;
