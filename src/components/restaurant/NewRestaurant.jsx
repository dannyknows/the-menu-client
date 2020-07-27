import React from "react";
import styled from "styled-components";

// components
import OpeningHours from "../user/OpeningHours";
import ContactForm from "../user/ContactForm";

const ColorBlock = styled.input`
  height: 50px;
  width: 50px;
  padding: 0;
  border: none;
  margin-right: 2.5px;
  margin-left: 2.5px;
`;

class NewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { name: "", headerColour: "", fontColour: "", foregroundColour: "", backgroundColour: "" };

  handleChange(event) {
    console.log(event.target.id);
    console.log(this.state);
    switch (event.target.id) {
      case "headerColour":
        return this.setState({ headerColour: event.target.value });
      case "fontColour":
        return this.setState({ fontColour: event.target.value });
      case "foregroundColour":
        return this.setState({ foregroundColour: event.target.value });
      case "backgroundColour":
        return this.setState({ backgroundColour: event.target.value });
      case "resName":
        return this.setState({ name: event.target.value });
      default:
        console.log("missed");
    }
  }

  handleSubmit = async (event) => {
    const styles = {
      headerColour: this.state.headerColour,
      fontColour: this.state.fontColour,
      foregroundColour: this.state.foregroundColour,
      backgroundColour: this.state.backgroundColour,
    };

    const body = {
      style_data: JSON.stringy(styles),
    };

    fetch(`http://localhost:3000/styles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    event.preventDefault();
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <p>Restaurant Name:</p>
          <input
            type="text"
            id="resName"
            placeholder="Name"
            value={this.state.resName}
            onChange={this.handleChange}
          />
          <p>Opening Hours:</p>
          {/* <OpeningHours /> */}
          <p>Contact Details:</p>
          {/* <ContactForm /> */}
          <div>
            <label htmlFor="Colour">
              <p>Colour Scheme:</p>
              <div>
                <ColorBlock
                  type="color"
                  value={this.state.headerColour}
                  onChange={this.handleChange}
                  id="headerColour"
                />
                <p>Header Colour</p>
              </div>
              <div>
                <ColorBlock
                  type="color"
                  value={this.state.fontColor}
                  onChange={this.handleChange}
                  id="fontColour"
                />
                <p>Font Colour</p>
              </div>
              <div>
                <ColorBlock
                  type="color"
                  value={this.state.foregroundColour}
                  onChange={this.handleChange}
                  id="foregroundColour"
                />
                <p>Foreground Colour</p>
              </div>
              <div>
                <ColorBlock
                  type="color"
                  value={this.state.backgroundColour}
                  onChange={this.handleChange}
                  id="backgroundColour"
                />
                <p>Background Colour</p>
              </div>
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default NewRestaurant;
