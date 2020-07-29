import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = { email: "", password: "", errMessage: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error("Incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        localStorage.setItem("auth", true);
        this.props.history.push("/dashboard");
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <div className='login-home'>
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
      {/* <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
              <input type="text" name="" required=""><label>Username</label>

          </div>

        </form>
        
      </div> 

    <div className="user-box">    </div>
      <input type="password" name="" required="">
      <label>Password</label>

    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a> */}

        <div className="login-box">
          <h2>Login</h2>
          {errMessage && <span style={{ color: "red" }}>{errMessage}</span>}
          <form onSubmit={this.onFormSubmit}>
            <div className="user-box">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={this.onInputChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.onInputChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>

        </div>
    );
  }
}

export default Login;
