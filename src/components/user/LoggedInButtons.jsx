import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { Link } from "react-router-dom";

class LoggedInButtons extends React.Component {
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
      <div>
        <Link className="button2" to="/dashboard">
          Dashboard
        </Link>
        <button
          className="button2"
          id="logout"
          onClick={() => this.handleLogout()}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default LoggedInButtons;
