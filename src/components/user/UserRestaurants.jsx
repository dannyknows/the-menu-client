import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { Link } from "react-router-dom";

class UserRestaurants extends React.Component {
  static contextType = RestaurantsContext;
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

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
            <p>{restaurant.opening_hours}</p>
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
            <p>{restaurant.opening_hours}</p>
            {restaurant.contact_infos.map((contact_info, index) => {
              return (
                <div key={index} className="contact_info">
                  <table>
                    <th>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Information</td>
                    </th>
                    <tr>
                      <td>{contact_info.name}</td>
                      <td>{contact_info.info_type}</td>
                      <td>{contact_info.info}</td>
                    </tr>
                  </table>
                </div>
              );
            })}
            <button>Add Contact Detail</button>

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
