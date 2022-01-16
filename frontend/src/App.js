import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

//finds code value from url
const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return (
    <div className="app">{code ? <Dashboard code={code} /> : <Login />}</div>
  );
};

export default App;
