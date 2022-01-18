import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

//Url http://localhost3000/?code=codeishere
//finds code value from url. Code is needed to generate accesstoken
//window.location.search === ?code=codeishere, and .get("code") gets the value from codeishere
const code = new URLSearchParams(window.location.search).get("code");

//if code is found, redirect ot dashboard with code on the screen, else go to login page
const App = () => {
  return (
    <div className="app">{code ? <Dashboard code={code} /> : <Login />}</div>
  );
};

export default App;
