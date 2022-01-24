import { useEffect, useState } from "react";
import axios from "axios";

//this hook receives accestoken from server
const useAuth = (code) => {
  //store accesstoken in useState
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const getToken = async () => {
      const response = await axios.post("http://localhost:3001/login", {
        code,
      });
      //console.log(response);
      if (response) {
        window.history.pushState({}, null, "/");
        setAccessToken(response.data.accessToken);
      } else {
        response.sendStatus(400);
      }
    };

    try {
      getToken();
    } catch (error) {
      window.location = "/";
    }
    //when code value changes useEffect will run
  }, [code]);

  return accessToken;
};

export default useAuth;
