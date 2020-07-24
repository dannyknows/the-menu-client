import React from 'react'

function dispatch(action, value) {
  console.log(this)
  console.log(action)
  console.log(value)
}

const RestaurantsContext = React.createContext({
  restaurants: [],
  dispatch: () => {}
})

export {
  dispatch,
  RestaurantsContext
}
