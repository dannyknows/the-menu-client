import React from "react";
// import { BookmarksContext } from "../context/bookmarks-context";

class SignUp extends React.Component {
//   static contextType = BookmarksContext;
  state = { email: "", password: "", full_name: "" };

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
        `http://localhost:3000/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: { email, password, full_name } }),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch(
          `http://localhost:3000/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth: { email, password } }),
          }
        );
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/restaurant/new");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    const { email, password, full_name } = this.state;
    return (
      <>
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
          />
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
      </>
    );
  }
}
export default SignUp;