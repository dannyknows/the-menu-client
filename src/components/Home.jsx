import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    // props.context.dispatch("logout");
    // props.history.push("/");
  };

  render() {
    return (
      <div className="home">
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
        <button id="logout" onClick={() => this.handleLogout()}>
        Logout
      </button>
      </div>
    );
  }
}

export default Home;
