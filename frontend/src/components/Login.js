import React from "react";
import loginUrl from "../../backend/spotifyConfig";

const Login = () => {
  return (
    <div>
      <a href={loginUrl}>login with spotify</a>
    </div>
  );
};

export default Login;
