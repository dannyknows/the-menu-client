import React from "react";
import Table from "../shared/Table";

class OpeningHours extends React.Component {
  state = {...JSON.parse(this.props.opening_hours),test:"",day: "monday",open_hr:"12",open_min:"00",open_ampm:"am",close_hr:"1",close_min:"00",close_ampm:"am"};

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  updateHours = async (string_data) => {
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
  }

  onFormSubmit = async (event) =>{
    event.preventDefault();
    const test = { opening_hours: [...this.state.opening_hours, {day:this.state.day,opening_hours:`${this.state.open_hr}:${this.state.open_min} ${this.state.open_ampm}`,closing_hours:`${this.state.close_hr}:${this.state.close_min} ${this.state.close_ampm}`}] };
    const string_data = JSON.stringify(test);
    console.log(this.props.restaurant_id);
    this.updateHours(string_data);
    this.setState({opening_hours: test.opening_hours});
  }

  deleteHours = (i) => {
    const data = this.state.opening_hours;
    data.splice(i,1);
    const string_data = JSON.stringify({ opening_hours: data } )
    this.updateHours(string_data);
    this.setState({ opening_hours: data });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Table>
          {console.log(this.state)}
          {this.state.opening_hours.map((oh, index) => {
            return (
              <ul>
                <li>{oh.day}</li>
                <li>{oh.opening_hours}</li>
                <li>{oh.closing_hours}</li>
                <li><button onClick={() => this.deleteHours(index)}>Delete</button></li>
              </ul>
            );
          })}
          <form id="opening_hours_form" onSubmit={this.onFormSubmit}>
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
                <input type="submit" value="Add Contact Detail" />
              </li>
            </ul>
          </form>
        </Table>
      </div>
    );
  }
}

export default OpeningHours;
