import React, { Component } from "react";
import { RestaurantsContext } from "../../context/restaurants-context";

export default class PopUp extends Component {
  static contextType = RestaurantsContext;
  state = {
    email: this.context.currentUser.email,
    full_name: this.context.currentUser.full_name,
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password, full_name } = this.state;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${this.context.currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user: { email, password, full_name } }),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        this.context.dispatch("update user", {
          email,
          full_name,
          id: this.context.currentUser.id,
        });
        this.handleClick();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  handleClick = () => {
    this.props.toggle();
  };
  render() {
    const { email, password, full_name } = this.state;
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;{" "}
          </span>
          <div>
          <h1>Change</h1>
          <form onSubmit={this.onFormSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={this.onInputChange}
              />
            </div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.onInputChange}
            />
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              value={full_name}
              onChange={this.onInputChange}
            />
            <input type="submit" value="Submit" />
          </form>
          </div>
        </div>
      </div>
    );
  }
}
