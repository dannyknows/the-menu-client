import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard";
import Restaurant from "../restaurant/restaurant";
import Buffer from "../buffer";

class ProtectedRoute extends Component {
  state = {
    auth: false,
    loading: true,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");
    if (token && auth) {
      this.setState({
        auth: true,
        loading: false,
      });
    } else {
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
