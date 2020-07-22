import React from "react";
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    );
  }
}

export default Home;



