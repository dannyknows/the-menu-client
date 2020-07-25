import React from "react";

function findIndex(array,id){
  return array.findIndex((item) => {
    console.log(item.id,id)
    return item.id === id;
  });
}

function dispatch(action, value) {
  switch (action) {
    case "populate":
      this.setState({ restaurants: value, auth: true });
      break;
    case "new contact":
      this.setState((state) => {
        const res_index = findIndex(state.restaurants,value.restaurant_id);
        state.restaurants[res_index].contact_infos.push(value);
        return { restaurants: [...state.restaurants] };
      });
      break;
    case "edit contact":
      this.setState((state) => {
        console.log(value.restaurant_id)
        const res_index = findIndex(state.restaurants,value.restaurant_id);
        console.log(state.restaurants[res_index].contact_infos);
        const con_index = findIndex(state.restaurants[res_index].contact_infos, value.contact_id)
        console.log(con_index);
        state.restaurants[res_index].contact_infos[con_index].name = value.updated_values.name;
        state.restaurants[res_index].contact_infos[con_index].info = value.updated_values.info;
        state.restaurants[res_index].contact_infos[con_index].info_type = value.updated_values.info_type;
        state.restaurants[res_index].contact_infos[con_index].updated_at = new Date();
        return { restaurants: [...state.restaurants] };
      })
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
