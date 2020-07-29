import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { Link } from "react-router-dom";
import OpeningHours from "./OpeningHours";
import ContactInfo from "./ContactInfo";
import Menu from "../restaurant/Menu";

class UserRestaurants extends React.Component {
  static contextType = RestaurantsContext;
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      contact_id: "",
      name: "",
      info: "",
      info_type: "",
      restaurant_id: "",
      edit_contact_index: "",
      restaurants: ""
    };
  }

  deleteRestaurant = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.context.dispatch("delete restaurant", id);
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

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;
    // the rest is the same...
    return this.context.restaurants.map((restaurant, index) => {
      if (isMobile) {
        return (
          <div key={index} className="restaurant">
            <h3>{restaurant.name} </h3>
            <OpeningHours
              opening_hours={JSON.parse(restaurant.opening_hours)}
              restaurant_id={restaurant.id}
            />
            <ContactInfo restaurant={restaurant} index={index} />
            <Menu restaurant={restaurant} new_status={false} />
            <div className="edit-delete-container">
              <button>Edit</button>
              <button onClick={() => this.deleteRestaurant(restaurant.id)}>
                Delete
              </button>
            </div>
            <hr />
          </div>
        );
      } else {
        return (
          <div key={index} className="restaurant">
            <h3>{restaurant.name} </h3>
            <h4>{restaurant.subdomain}</h4>
            <OpeningHours
              opening_hours={JSON.parse(restaurant.opening_hours)}
              restaurant_id={restaurant.id}
            />
            <ContactInfo restaurant={restaurant} index={index} />
            <Menu restaurant={restaurant} />
            <div className="edit-delete-container">
              <Link to={`/restaurant/${restaurant.subdomain}`}> View </Link>
              <button>Edit</button>
              <button onClick={() => this.deleteRestaurant(restaurant.id)}>
                Delete
              </button>
            </div>
            <hr />
          </div>
        );
      }
    });
  }
}

export default UserRestaurants;
