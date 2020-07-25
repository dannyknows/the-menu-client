import React from "react";

function dispatch(action, value) {
  switch (action) {
    case "populate":
      this.setState({ restaurants: value, auth: true });
      break;
      case "new contact info":
        this.setState((state) => {
          state.restaurants[value.res_index].contact_infos.push(value.contact_info);
          console.log(state.restaurants)
          return { restaurants: [...state.restaurants] };
        })
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
