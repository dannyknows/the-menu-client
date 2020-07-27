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
        <Banner>The Menu</Banner>
        {this.context.currentUser || localStorage.getItem("auth") ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button id="logout" onClick={() => this.handleLogout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    );
  }
}

export default Home;
