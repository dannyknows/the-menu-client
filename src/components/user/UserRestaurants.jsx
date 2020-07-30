import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { Link } from "react-router-dom";
import OpeningHours from "./OpeningHours";
import ContactInfo from "./ContactInfo";
import Menu from "../restaurant/Menu";
import Styles from "../shared/Styles";

class UserRestaurants extends React.Component {
  static contextType = RestaurantsContext;
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      contactId: "",
      name: "",
      info: "",
      infoType: "",
      restaurantId: "",
      editContactIndex: "",
      restaurants: "",
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
      // Use this to change the layour for mobile
      if (isMobile) {
        return (
          <div key={index} className="restaurant">
            <h3>{restaurant.name} </h3>
            <OpeningHours opening_hours={JSON.parse(restaurant.opening_hours)} restaurantId={restaurant.id} />
            <ContactInfo restaurant={restaurant} index={index} />
            <Menu restaurant={restaurant} new_status={false} />
            <div className="edit-delete-container">
              <button>Edit</button>
              <button onClick={() => this.deleteRestaurant(restaurant.id)}>Delete</button>
              <Link to={`/restaurant/${restaurant.subdomain}`}> View </Link>
            </div>
            <hr />
          </div>
        );
      } else {
        return (
          <div key={index} className="restaurant">
            <h3>{restaurant.name} </h3>
            <div>
              <h4>Opening Hours</h4>
              <OpeningHours
                opening_hours={JSON.parse(restaurant.opening_hours)}
                restaurantId={restaurant.id}
              />
              <h4>Contact Info</h4>
              <ContactInfo restaurant={restaurant} index={index} />
            </div>
            <Menu restaurant={restaurant} />
            <Styles
              type={"Restaurant"}
              id={restaurant.id}
              new={false}
              style={{id: restaurant.style.id, style_data: JSON.parse(restaurant.style.style_data)}}
            />
            <div className="edit-delete-container">
              <Link class={"button"} to={`/restaurant/${restaurant.subdomain}`}>
                {" "}
                Visit Restaurant{" "}
              </Link>
              <button onClick={() => this.deleteRestaurant(restaurant.id)}>
                Delete
              </button>
            </div>
          </div>
        );
      }
    });
  }
}

export default UserRestaurants;
