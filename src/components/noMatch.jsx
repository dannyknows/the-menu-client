import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className={"noMatch"}>
      <div>
        <h3>404</h3>
        <h1>page not found</h1>
        <Link id="link" to={"/"}>Take me home!</Link>
      </div>
    </div>
  );
};

export default NoMatch;
