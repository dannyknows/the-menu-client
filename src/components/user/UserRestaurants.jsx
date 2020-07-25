import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import Table from "../shared/Table";
import OpeningHours from "./OpeningHours"

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
    };
  }

  deleteRestaurant = async (id) => {
    await fetch(`http://localhost:3000/restaurants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.context.dispatch("delete restaurant",id)
  };

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

  deleteContact = async (rest_id, cont_id) => {
    await fetch(
      `http://localhost:3000/restaurants/${rest_id}/contact_infos/${cont_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.context.dispatch("remove contact", {
      restaurant_id: rest_id,
      contact_id: cont_id,
    });
  };

  editContact = (contact_index, contact_info) => {
    this.setState({
      edit_contact_index: contact_index,
      name: contact_info.name,
      info: contact_info.info,
      info_type: contact_info.info_type,
      restaurant_id: contact_info.restaurant_id,
      contact_id: contact_info.id,
    });
  };

  editContactFormSubmit = async (event) => {
    event.preventDefault();
    const { name, info_type, info } = this.state;
    await fetch(
      `http://localhost:3000/restaurants/${this.state.restaurant_id}/contact_infos/${this.state.contact_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ contact_info: { name, info_type, info } }),
      }
    );
    this.context.dispatch("edit contact", {
      restaurant_id: this.state.restaurant_id,
      contact_id: this.state.contact_id,
      updated_values: { name, info_type, info },
    });
    this.setState({ edit_contact_index: "" });
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
            <OpeningHours opening_hours={restaurant.opening_hours} restaurant_id={restaurant.id}/>
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
            <OpeningHours opening_hours={restaurant.opening_hours} restaurant_id={restaurant.id}/>
            <Table>
              <ul>
                <li>Name</li>
                <li>Type</li>
                <li>Information</li>
                <li>Actions</li>
              </ul>
              {restaurant.contact_infos.map((contact_info, index) => {
                return index === this.state.edit_contact_index ? (
                  <div key={index} className="contact_info">
                    <form
                      id="edit_contact_form"
                      onSubmit={this.editContactFormSubmit}
                    >
                      <ul>
                        <li>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={this.onInputChange}
                            value={this.state.name}
                          />
                        </li>

                        <li>
                          <input
                            type="text"
                            name="info"
                            id="info"
                            placeholder="Info"
                            onChange={this.onInputChange}
                            value={this.state.info}
                          />
                        </li>
                        <li>
                          <select
                            name="info_type"
                            id="info_type"
                            onChange={this.onInputChange}
                            value={this.state.info_type}
                          >
                            <option value="link">Link</option>
                            <option value="phone number">Phone Number</option>
                            <option value="other">Other</option>
                          </select>
                        </li>
                        <li>
                          <input type="submit" value="Save" />
                        </li>
                      </ul>
                    </form>
                  </div>
                ) : (
                  <div key={index} className="contact_info">
                    <ul>
                      <li>{contact_info.name}</li>
                      <li>{contact_info.info}</li>
                      <li>{contact_info.info_type}</li>
                      <li>
                        <button
                          onClick={() => this.editContact(index, contact_info)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            this.deleteContact(
                              contact_info.restaurant_id,
                              contact_info.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              })}
              <ContactForm
                res_id={restaurant.id}
                res_index={index}
                getRestaurants={this.props.getRestaurants}
              />
            </Table>
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
