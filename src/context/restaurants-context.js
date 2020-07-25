import React from "react";

function dispatch(action, value) {
  switch (action) {
    case "populate":
      this.setState({ restaurants: value, auth: true });
      break;
    case "new contact":
      this.setState((state) => {
        const res_index = state.restaurants.findIndex((rest) => {
          return rest.id === value.restaurant_id;
        });
        state.restaurants[res_index].contact_infos.push(value);
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "remove contact":
      this.setState((state) => {
        const res_index = state.restaurants.findIndex((rest) => {
          return rest.id === value.restaurant_id;
        });
        const con_index = state.restaurants[res_index].contact_infos.findIndex(
          (cont) => {
            return cont.id === value.contact_id;
          }
        );
        state.restaurants[res_index].contact_infos.splice(con_index,1);
        return { restaurants: [...state.restaurants] };
      });
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
  auth: false,
});

export { dispatch, RestaurantsContext };
