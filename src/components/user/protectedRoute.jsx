import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard";
import Restaurant from "../restaurant/restaurant";
import Buffer from "../buffer";
import { RestaurantsContext } from "../../context/restaurants-context";
import Item from "../user/Item";
import StyleView from "./StyleView";
import NewRestaurant from "../restaurant/NewRestaurant";

class ProtectedRoute extends Component {
  static contextType = RestaurantsContext;
  state = {
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");
    if (token && auth) {
      this.setState({
        auth: true,
        loading: false,
      });
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/restaurants`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const { restaurants } = await response.json();
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/status/user`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.status >= 400) {
            throw new Error("not authorized");
          } else {
            const { user } = await response.json();
            this.context.dispatch("populate", { restaurants, user });

            this.setState({
              auth: true,
              loading: false,
            });
          }
        } catch (err) {
          console.log(err);
        }
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
            <Route exact path="/dashboard/item" component={Item} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/restaurant/:subdomain/:state"
              component={Restaurant}
            />
            <Route exact path="/theme" component={StyleView} />
            <Route exact path="/dashboard/new" component={NewRestaurant} />
          </Switch>
        </>
      );
    } else {
      return <Buffer />;
    }
  }
}

export default ProtectedRoute;
