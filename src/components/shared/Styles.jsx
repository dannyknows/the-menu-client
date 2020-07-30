import React from "react";
import styled from "styled-components";
import { RestaurantsContext } from "../../context/restaurants-context";

const ColorBlock = styled.input`
  height: 50px;
  width: 50px;
  padding: 0;
  border: none;
  margin-right: 2.5px;
  margin-left: 2.5px;
`;

// Create an Input component that'll render an <input> tag with some styles
const Input = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.textColor || "white"};
  background: ${(props) => props.bgColor || "palevioletred"};
  border: 2px solid ${(props) => props.borderColour};
  border-radius: 3px;
`;

class Styles extends React.Component {
  static useContext = RestaurantsContext;
  state = {
    foreground: this.props.style.style_data.foreground,
    background: this.props.style.style_data.foreground,
    color: this.props.style.style_data.foreground ,
    border: this.props.style.style_data.foreground ,
    header: this.props.style.style_data.foreground ,
    style: this.props.style,
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  updateStyles = async () => {
    const jsonData = JSON.stringify({
      foreground: this.state.foreground,
      background: this.state.background,
      color: this.state.color,
      border: this.state.border,
      header: this.state.header,
    });
    const body = {
      style: {
        style_data: jsonData,
      },
    };
    console.log(this.state.style);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/styles/${this.state.style.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      this.state.style.style_data = jsonData;
      this.context.dispatch("new style", {
        type: "Restaurant",
        id: this.props.id,
        style: this.state.style,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    if (this.props.new) {
      const body = {
        style: {
          style_data: JSON.stringify({}),
        },
        styleable_type: this.props.type,
        styleable_id: this.props.id,
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/styles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
          }
        );
        const newStyle = await response.json();
        this.setState({ style: newStyle });
        // this.state.style.style_data = {
        //   foreground: "#000000FF",
        //   background: "#000000FF",
        //   color: "#FFFFFFFF",
        //   border: "#000000FF",
        //   header: "#000000FF",
        // }
        this.context.dispatch("new style", {
          type: "Restaurant",
          id: this.props.id,
          style: newStyle,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
    console.log(this.state.background);
    return (
      <div>
        <Input defaultValue="@probablyup" type="text" />
        <Input
          defaultValue="@geelen"
          type="text"
          bgColor={this.state.background}
          textColor={this.state.color}
          borderColour={this.state.border}
        >
          {" "}
          <p>TEST</p>
        </Input>
        <div>
          <label htmlFor="Colour">
            <p>Colour Scheme:</p>
            <div>
              <ColorBlock
                type="color"
                value={this.state.background}
                onChange={this.onInputChange}
                id="background"
              />
              <p>Header Colour</p>
            </div>
            <div>
              <ColorBlock
                type="color"
                value={this.state.color}
                onChange={this.onInputChange}
                id="color"
              />
              <p>Font Colour</p>
            </div>
            <div>
              <ColorBlock
                type="color"
                value={this.state.foregroundColour}
                onChange={this.onInputChange}
                id="foregroundColour"
              />
              <p>Foreground Colour</p>
            </div>
            <div>
              <ColorBlock
                type="color"
                value={this.state.backgroundColour}
                onChange={this.onInputChange}
                id="backgroundColour"
              />
              <p>Background Colour</p>
            </div>
            <button onClick={this.updateStyles}>Save Colours</button>
          </label>
        </div>
      </div>
    );
  }
}

export default Styles;
