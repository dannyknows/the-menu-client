import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../../context/restaurants-context";
import UserRestaurants from "./UserRestaurants";
import Banner from '../shared/Banner'
import PopUp from '../shared/PopUp'

class Dashboard extends Component {
  static contextType = RestaurantsContext;
  state = {
    width: window.innerWidth,
    seen: false
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };


  togglePop = () => {
    this.setState({
     seen: !this.state.seen
    });
   };

  render() {
    this.context.dispatch();
    return (
      <div>
          {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
        <Banner>Welcome Back {this.context.currentUser?.full_name}</Banner>
        <div>
          <h2>Account</h2>
          <div>
            <h4>{this.context.currentUser?.full_name}</h4>
            <h4>{this.context.currentUser?.email}</h4>
            <button onClick={this.togglePop}>Edit</button>
          </div>
        </div>
        <hr />
        <h2>Restaurants</h2>
        <UserRestaurants getRestaurants={this.getRestaurants}/>
        <Link to="/dashboard/new">Add a New Restaurant</Link>
      </div>
    );
  }
}

export default Dashboard;