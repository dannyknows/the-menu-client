import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";



class UserRestaurants extends React.Component {
  static contextType = RestaurantsContext;
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      contact_name: "",
      contact_info: "",
      contact_info_type: ""
    };
  }

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
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

  inputChange = (event) => {
    console.log('hello')
  }
  
  deleteContact = async (rest_id, cont_id) => {
    await fetch(`http://localhost:3000/restaurants/${rest_id}/contact_infos/${cont_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.context.dispatch("remove contact",{restaurant_id: rest_id, contact_id: cont_id})
  }

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
                    <ul>
                      <li>Name</li>
                      <li>Type</li>
                      <li>Information</li>
                    </ul>
            {restaurant.contact_infos.map((contact_info, index) => {
              return (
                <div key={index} className="contact_info">
                  <table>
                    <tr>
                      <td onClick={this.inputChange}>{contact_info.name}</td>
                      <td>{contact_info.info_type}</td>
                      <td>{contact_info.info}</td>
                    </tr>
                  </table>
                  <li onClick={() => this.deleteContact(contact_info.restaurant_id,contact_info.id)}>Delete</li>
                </div>
              );
            })}
            {console.log(this.props)}
            <ContactForm res_id={restaurant.id} res_index={index} getRestaurants={this.props.getRestaurants}/>

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
