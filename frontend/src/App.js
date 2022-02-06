import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Grommet } from "grommet";

//Url http://localhost3000/?code=codeishere
//finds code value from url. Code is needed to generate accesstoken
//window.location.search === ?code=codeishere, and .get("code") gets the value from codeishere
const code = new URLSearchParams(window.location.search).get("code");

const myTheme = {
  global: {
    colors: {
      brand: "status-ok",
    },
  },
  select: {
    icons: {
      color: "status-ok",
    },
  },
  button: {
    border: {
      color: "dark-1",
    },
  },
};

//if code is found, redirect to dashboard with code on the screen, else go to login page
const App = () => {
  return (
    <Grommet theme={myTheme}>
      <div className="app">{code ? <Dashboard code={code} /> : <Login />}</div>
    </Grommet>
  );
};

export default App;
