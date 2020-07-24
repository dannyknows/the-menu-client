import React, { Component } from 'react';

export default class Dashboard extends Component {
  async componentDidMount() {
    const response = await fetch("http://localhost:3000/restaurants",  {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const restaurants = await response.json();
    console.log(restaurants);
  }

  render() {
    return (
      <>
      <h1> user dashboard </h1>
      </>
    );
  }
}
