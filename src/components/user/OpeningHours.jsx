import React from "react";
import Table from "../shared/Table";

class OpeningHours extends React.Component {
  state = { opening_hours: this.props.opening_hours.opening_hours ,test:"",day: "Monday",open_hr:"12",open_min:"00",open_ampm:"am",close_hr:"1",close_min:"00",close_ampm:"am",edit_oh_index:""};

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  updateHours = async (string_data) => {
    if(this.props.restaurant_id){
      await fetch(`http://localhost:3000/restaurants/${this.props.restaurant_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ opening_hours: string_data }),
        }
      );
    }else{
      this.props.setOpeningHours(JSON.parse(string_data))
    }
  }

  saveNewHours= async (event) =>{
    event.preventDefault();
    const test = { opening_hours: [...this.state.opening_hours, {day:this.state.day, opening_hours: {open_hr:this.state.open_hr , open_min:this.state.open_min , open_ampm : this.state.open_ampm} , closing_hours: {close_hr: this.state.close_hr , close_min: this.state.close_min , close_ampm: this.state.close_ampm}}] };
    const string_data = JSON.stringify(test);
    this.updateHours(string_data);
    this.setState({opening_hours: test.opening_hours});
  }

  saveEditHours = (event) => {
    event.preventDefault();
    const { opening_hours } = this.state;
    opening_hours[this.state.edit_oh_index] = {day:this.state.edit_day, opening_hours: {open_hr:this.state.edit_open_hr , open_min:this.state.edit_open_min , open_ampm : this.state.edit_open_ampm} , closing_hours: {close_hr: this.state.edit_close_hr , close_min: this.state.edit_close_min , close_ampm: this.state.edit_close_ampm}}
    const string_data = JSON.stringify({opening_hours: opening_hours});
    this.updateHours(string_data);
    this.setState({ opening_hours: opening_hours, edit_oh_index: "" });
  }

  editHours = (i,oh) => {
    this.setState({edit_oh_index: i, edit_day: oh.day, edit_open_hr: oh.opening_hours.open_hr, edit_open_min: oh.opening_hours.open_min, edit_open_ampm: oh.opening_hours.open_ampm, edit_close_hr: oh.closing_hours.close_hr, edit_close_min: oh.closing_hours.close_min, edit_close_ampm: oh.closing_hours.close_ampm});
  }

  deleteHours = (i) => {
    const data = this.state.opening_hours;
    data.splice(i,1);
    const string_data = JSON.stringify({ opening_hours: data } )
    this.updateHours(string_data);
    this.setState({ opening_hours: data });
  }

  render() {
    return (
      <div>
        <Table>
          {this.state.opening_hours.map((oh, index) => {
            return index === this.state.edit_oh_index ? (
            <form id="opening_hours_form" onSubmit={this.saveEditHours}>
            <ul key={index}>
              <li>
                <select name="edit_day" id="edit_day" onChange={this.onInputChange} value={this.state.edit_day}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </li>
              <li>
                <select
                  name="edit_open_hr"
                  id="edit_open_hr"
                  onChange={this.onInputChange}
                  value={this.state.edit_open_hr}
                >
                  <option value="12">12</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                :
                <select
                  name="edit_open_min"
                  id="edit_open_min"
                  onChange={this.onInputChange}
                  value={this.state.edit_open_min}
                >
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
                :
                <select
                  name="edit_open_ampm"
                  id="edit_open_ampm"
                  onChange={this.onInputChange}
                  value={this.state.edit_open_ampm}
                >
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </li>
              <li>
                <select
                  name="edit_close_hr"
                  id="edit_close_hr"
                  onChange={this.onInputChange}
                  value={this.state.edit_close_hr}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                :
                <select
                  name="edit_close_min"
                  id="edit_close_min"
                  onChange={this.onInputChange}
                  value={this.state.edit_close_min}
                >
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
                :
                <select
                  name="edit_close_ampm"
                  id="edit_close_ampm"
                  onChange={this.onInputChange}
                  value={this.state.edit_close_ampm}
                >
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </li>
              <li>
                <input type="submit" value="Save" />
              </li>
            </ul>
          </form>
            ) : (
              <ul key={index}>
                <li>{oh.day}</li>
                <li>{oh.opening_hours.open_hr}:{oh.opening_hours.open_min}{oh.opening_hours.open_ampm}</li>
                <li>{oh.closing_hours.close_hr}:{oh.closing_hours.close_min}{oh.closing_hours.close_ampm}</li>
                <li><button onClick={() => this.editHours(index,oh)}>Edit</button><button onClick={() => this.deleteHours(index)}>Delete</button></li>
              </ul>
            );
          })}
          <form id="opening_hours_form" onSubmit={this.saveNewHours}>
            <ul>
              <li>
                <select name="day" id="day" onChange={this.onInputChange}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </li>
              <li>
                <select
                  name="open_hr"
                  id="open_hr"
                  onChange={this.onInputChange}
                >
                  <option value="12">12</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                :
                <select
                  name="open_min"
                  id="open_min"
                  onChange={this.onInputChange}
                >
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
                :
                <select
                  name="open_ampm"
                  id="open_ampm"
                  onChange={this.onInputChange}
                >
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </li>
              <li>
                <select
                  name="close_hr"
                  id="close_hr"
                  onChange={this.onInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                :
                <select
                  name="close_min"
                  id="close_min"
                  onChange={this.onInputChange}
                >
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
                :
                <select
                  name="close_ampm"
                  id="close_ampm"
                  onChange={this.onInputChange}
                >
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </li>
              <li>
                <input type="submit" value="Add Opening Hours" />
              </li>
            </ul>
          </form>
        </Table>
      </div>
    );
  }
}

export default OpeningHours;
