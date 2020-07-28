import React from "react";

function findIndex(array, id) {
  return array.findIndex((item) => {
    return item.id === id;
  });
}

function dispatch(action, value) {
  switch (action) {
    case "populate":
      this.setState({
        restaurants: value.restaurants,
        auth: true,
        currentUser: value.user,
      });
      break;
    case "update user":
      this.setState({
        currentUser: {
          id: value.id,
          email: value.email,
          full_name: value.full_name,
        },
      });
      break;
    case "add restaurant":
      this.setState((state) => {
        return { restaurants: [...state.restaurants, value] };
      });
      break;
    case "delete restaurant":
      this.setState((state) => {
        const restaurants = state.restaurants.filter((restaurant) => {
          return restaurant.id !== value;
        });
        return {
          restaurants: restaurants,
        };
      });
      break;
    case "new menu":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants, value.restaurant_id);
        state.restaurants[res_index].menus.push(value);
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "update menu":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants, value.restaurant_id);
        const menu_index = findIndex(
          state.restaurants[res_index].menus,
          value.menu_id
        );
        state.restaurants[res_index].menus[menu_index].title =
          value.updated_values.title;
        state.restaurants[res_index].menus[menu_index].updated_at = new Date();
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "remove menu":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants, value.restaurant_id);
        const menu_index = findIndex(
          state.restaurants[res_index].menus,
          value.menu_id
        );
        state.restaurants[res_index].menus.splice(menu_index, 1);
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "new item":
      this.setState((state) => {
        console.log(value);
        const res_index = findIndex(state.restaurants, value.current_menu.restaurant_id);
        state.restaurants[res_index].menus[value.menu_index].items.push(value.item);
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "new contact":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants, value.restaurant_id);
        state.restaurants[res_index].contact_infos.push(value);
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "edit contact":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants, value.restaurant_id);
        const con_index = findIndex(
          state.restaurants[res_index].contact_infos,
          value.contact_id
        );
        state.restaurants[res_index].contact_infos[con_index].name =
          value.updated_values.name;
        state.restaurants[res_index].contact_infos[con_index].info =
          value.updated_values.info;
        state.restaurants[res_index].contact_infos[con_index].info_type =
          value.updated_values.info_type;
        state.restaurants[res_index].contact_infos[
          con_index
        ].updated_at = new Date();
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "remove contact":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants, value.restaurant_id);
        const con_index = findIndex(
          state.restaurants[res_index].contact_infos,
          value.contact_id
        );
        state.restaurants[res_index].contact_infos.splice(con_index, 1);
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
