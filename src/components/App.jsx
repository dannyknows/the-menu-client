import React from "react";
import { Route, Switch } from "react-router-dom";
// home components 
import Home from "./Home";
import NoMatch from "./noMatch";
import Login from './Login'
import SignUp from './SignUp'
// user components 
import ProtectedRoute from './user/protectedRoute'

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/dashboard" component={ProtectedRoute} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}

export default App;
