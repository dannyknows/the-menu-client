import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./dashboard";
import Buffer from "../buffer";

class ProtectedRoute extends Component {
  state = {
    auth: false,
    loading: true
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth")
    if (token.length > 75 && auth) {
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
    console.log(loading,auth)
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
