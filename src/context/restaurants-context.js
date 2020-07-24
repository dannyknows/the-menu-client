import React from 'react'

function dispatch(action, value) {
  switch(action) {
    case "populate": {
      this.setState({ restaurants: value })
      break;
    } default: {
      console.log("in default")
    }
  }
}

const RestaurantsContext = React.createContext({
  restaurants: [],
  dispatch: () => {}
})

export {
  dispatch,
  RestaurantsContext
}
