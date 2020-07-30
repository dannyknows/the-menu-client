import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import ContactForm from "./ContactForm";

class ContactInfo extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    contact_id: "",
    name: "",
    info: "",
    info_type: "",
    restaurant_id: "",
    edit_contact_index: "",
    restaurant: this.props.restaurant,
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
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

  update = () => {
    const res_index = this.context.restaurants.findIndex((item) => {
      return item.id === this.state.restaurant.id;
    });
    this.setState({ restaurant: this.context.restaurants[res_index] });
  };

  editContactFormSubmit = async (event) => {
    event.preventDefault();
    const { name, info_type, info } = this.state;
    if (this.props.restaurant.id) {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${this.state.restaurant_id}/contact_infos/${this.state.contact_id}`,
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
    }
  };

  deleteContact = async (rest_id, cont_id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurants/${rest_id}/contact_infos/${cont_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.context.dispatch("remove contact", {
      restaurant_id: rest_id,
      contact_id: cont_id,
    });
  };

  render() {
    return (
      <div className={"formGrid"}>
        <ul>
          <li>Name</li>
          <li>Type</li>
          <li>Information</li>
          <li>Actions</li>
        </ul>
        {this.state.restaurant.contact_infos.map((contact_info, index) => {
          return index === this.state.edit_contact_index ? (
            <div key={index} className="contact_info">
              <form id="edit_contact_form" onSubmit={this.editContactFormSubmit}>
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
                  <button onClick={() => this.editContact(index, contact_info)}>Edit</button>
                  <button onClick={() => this.deleteContact(contact_info.restaurant_id, contact_info.id)}>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          );
        })}
        <ContactForm
          res_id={this.props.restaurant.id}
          res_index={this.props.index}
          getRestaurants={this.props.getRestaurants}
          update={this.update}
        />
      </div>
    );
  }
}

export default ContactInfo;
