import React from "react";

class EditableField extends React.Component {
  state = {
    itemTitle: this.props.input,
    itemEdit: false,
  };
  toggleField = () => {
    this.setState({
      itemEdit: !this.state.itemEdit,
    });
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.toggleField();
      this.props.updateField(this.state.itemTitle, this.props.id);
    }
  };

  getInputFormat = (format) => {
    switch (format) {
      case "textarea":
        return (
          <textarea
            id="itemTitle"
            name="itemTitle"
            cols="30"
            rows="10"
            onKeyPress={this.keyPressed}
            onChange={this.onInputChange}
            onBlur={this.toggleField}
            value={this.state.itemTitle}
          ></textarea>
        );
        break;
      default:
        return (
          <input
            id="itemTitle"
            type={this.props.inputStyle}
            onKeyPress={this.keyPressed}
            onChange={this.onInputChange}
            value={this.state.itemTitle}
            onBlur={this.toggleField}
          />
        );
    }
  };

  render() {
    return (
      <div>
        {this.state.itemEdit ? (
          this.getInputFormat(this.props.inputStyle)
        ) : (
          <p onClick={this.toggleField}>{this.state.itemTitle}</p>
        )}
      </div>
    );
  }
}

export default EditableField;
