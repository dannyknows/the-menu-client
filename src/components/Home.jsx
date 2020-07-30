import React from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../context/restaurants-context";
import LoggedInButtons from "./user/LoggedInButtons";

class Home extends React.Component {
  static contextType = RestaurantsContext;

  render() {
    return (
      <div className="home">
        <header>
        {this.context.currentUser || localStorage.getItem("auth") ? (
          <LoggedInButtons />
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
