import React from "react";
import ColourPicker from "./ColourPicker";
import {RestaurantsContext} from "../../context/restaurants-context";

class StyleView extends React.Component {
  static contextType = RestaurantsContext;
  state = {
    theme: this.props.theme,
    style: this.props.style
  }

  updateStyles = (colourState) =>{
    this.setState(colourState);
  }

  render() {
    const {background, textColour, theme, style} = this.state
    return (
      <div className="colourScheme">
        <h3>Colours Scheme</h3>
        <ColourPicker updateStyles={this.updateStyles} elementName="background"/> <p>Background</p>
        <ColourPicker updateStyles={this.updateStyles}/> <p>Text Colour</p>
        <ColourPicker updateStyles={this.updateStyles}/> 
        <ColourPicker updateStyles={this.updateStyles}/>
      </div>
    );
  }
}

export default StyleView;
