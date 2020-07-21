import React from "react";
import { Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
// import Home from "./Home";
// import NoMatch from "./NoMatch";
import Login from './Login'
// import SignUp from './SignUp'

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} /> */}
      </Switch>
    </>
  );
}

export default App;
