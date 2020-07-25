import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard";
import Restaurant from "../restaurant/restaurant";
import Buffer from "../buffer";
import { RestaurantsContext } from "../../context/restaurants-context";

class ProtectedRoute extends Component {
  static contextType = RestaurantsContext;
  state = {
    auth: false,
    loading: true,
  };

  // getRestaurants = async () => {
  //   return await fetch(`http://localhost:3000/restaurants`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  // };

  // checkStatusCode = (response) => {
  //   if (response.status >= 400) {
  //     throw new Error("not authorized");
  //   }
  // };

  // setTokenAndDispatch = async (response) => {
  //   const { jwt, restaurants } = await response.json();
  //   localStorage.setItem("token", jwt);
  //   this.context.dispatch("populate", restaurants);
  // };

  // setLoading = () => this.setState({ loading: false });

  // async componentDidMount() {
  //   try {
  //     const response = await this.getBookmarks()
  //     this.checkStatusCode(response)
  //     await this.setTokenAndDispatch(response)
  //   } catch (err) {
  //     this.context.dispatch("logout")
  //   } finally {
  //     this.setLoading()
  //   }
  // }

  async componentDidMount() {
    const token = localStorage.getItem("token");
     const auth = localStorage.getItem("auth");
    if (token && auth) {
        this.setState({
          auth: true,
          loading: false})
        }
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
    if (!loading && !auth) {
      return <Redirect to="/" />;
    } else if (!loading && auth) {
      return (
        <>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/restaurant/:subdomain/:state" component={Restaurant} />
          </Switch>
        </>
      );
    } else {
      return <Buffer />;
    }
  }
}

export default ProtectedRoute;
