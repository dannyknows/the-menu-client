import React from "react";
import ColourPicker from "./ColourPicker";
import {RestaurantsContext} from "../../context/restaurants-context";

class StyleView extends React.Component {
  static contextType = RestaurantsContext;

  updateStyles = (colourState) =>{
    this.setState(colourState);
  }

  render() {
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
