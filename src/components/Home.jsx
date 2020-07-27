import React from "react";
import { Link } from "react-router-dom";
import Banner from "./shared/Banner";
import { RestaurantsContext } from "../context/restaurants-context";

class Home extends React.Component {
  static contextType = RestaurantsContext;

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    this.context.dispatch("logout");
    const { history } = this.props;
    if (history) history.push("/");
  };

  render() {
    return (
      <div className="home">
        <header>
        {this.context.currentUser || localStorage.getItem("auth") ? (
          <>
            <Link className="button2" to="/dashboard">Dashboard</Link>
            <button className="button2" id="logout" onClick={() => this.handleLogout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="button2" to="/login">Login</Link>
            <Link className="button2" to="/sign-up">Sign Up</Link>
          </>
        )}
        </header>
        <div className="content">
          <div className="title">
          <h1>The Menu</h1>
          <p>Create a Website for Your Restaurant in minutes</p>
          <Link className="button1" to="/sign-up">Register Now!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
