import React from "react";
import { RestaurantsContext } from "../../context/restaurants-context";

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
    if(this.props.res_id){
      const body = {
        contact_info: {
          name: this.state.name,
          info_type: this.state.info_type,
          info: this.state.info,
        },
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/restaurants/${this.state.res_id}/contact_infos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
          }
        );
        if (response.status >= 400) {
          const error = await response.json();
          throw error;
        }else{
          const newContactInfo = await response.json();
          this.context.dispatch("new contact", newContactInfo);
          this.props.update()
          this.setState({ info_type: "link", name: undefined, info: undefined });
        }
      } catch (err) {
        console.log(err.errors);
        this.setState({errMessage: err});
      }
    }else{
      
    }
    document.getElementById(`contact_form${this.state.res_id}`).reset();
  };

  render() {
    const {errMessage, res_id} = this.state;
    return (
      <>
      {errMessage && errMessage.errors.map((error, index) => <p key={index} style={{ color: "red" }}>{error}</p>)}
        <form id={`contact_form${res_id}`} onSubmit={this.onFormSubmit}>
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
