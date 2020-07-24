import React from "react";
import { Route, Switch } from "react-router-dom";

// home components
import Home from "./Home";
import NoMatch from "./noMatch";
import Login from "./Login";
import SignUp from "./SignUp";
// user components
import ProtectedRoute from "./user/protectedRoute";
import Restaurant from "./restaurant/restuarant";
import { RestaurantsContext, dispatch } from '../context/restaurants-context'


class App extends React.Component {
  state = { restaurants: [], dispatch: dispatch.bind(this) }

  render(){
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/dashboard" component={ProtectedRoute} />
          <Route exact path="/restaurant/:subdomain" component={Restaurant} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

export default App;
