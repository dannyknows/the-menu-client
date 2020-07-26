import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";
import { withRouter, NavLink } from "react-router-dom";

class ContactForm extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    res_id: this.props.res_id,
    info_type: "link",
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const body = {
      contact_info: {
        name: this.state.name,
        info_type: this.state.info_type,
        info: this.state.info,
      },
    };
    const response = await fetch(
      `http://localhost:3000/restaurants/${this.state.res_id}/contact_infos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }
    );
    const newContactInfo = await response.json();
    this.context.dispatch("new contact", newContactInfo);
    document.getElementById("contact_form").reset();
    this.setState({ info_type: "link", name: undefined, info: undefined });
    const { history } = this.props;
    if (history) history.push("/dashboard");
  };

  render() {
    return (
      <>
        <form id="contact_form" onSubmit={this.onFormSubmit}>
          <ul>
            <li>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onInputChange}
              />
            </li>
            <li>
              <input
                type="text"
                name="info"
                id="info"
                placeholder="Info"
                onChange={this.onInputChange}
              />
            </li>
            <li>
              <select
                name="info_type"
                id="info_type"
                onChange={this.onInputChange}
              >
                <option value="link">Link</option>
                <option value="phone number">Phone Number</option>
                <option value="other">Other</option>
              </select>
            </li>
            <li>
              <input type="submit" value="Add Contact Detail" />
            </li>
          </ul>
        </form>
      </>
    );
  }
}
export default ContactForm;
