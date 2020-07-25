import React from "react";

function dispatch(action, value) {
  switch (action) {
    case "populate":
      this.setState({ restaurants: value, auth: true });
      break;
    case "logout":
      this.setState({ currentUser: false, restaurants: [], auth: false });
      break;
    default:
      console.log("in default");
  }
}

const RestaurantsContext = React.createContext({
  restaurants: [],
  dispatch: () => {},
  auth: false
});

export { dispatch, RestaurantsContext };
