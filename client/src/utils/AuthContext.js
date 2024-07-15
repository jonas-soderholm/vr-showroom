// import React, { createContext, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authTokens, setAuthTokens] = useState(null);

//   const loginUser = async (username, password) => {
//     const response = await axios.post("token/", {
//       username,
//       password,
//     });
//     setAuthTokens(response.data);
//   };

//   const logoutUser = () => {
//     setAuthTokens(null);
//   };

//   return <AuthContext.Provider value={{ authTokens, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    return access && refresh ? { access, refresh } : null;
  });

  const loginUser = async (username, password) => {
    const response = await axios.post("token/", {
      username,
      password,
    });
    setAuthTokens(response.data);
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return <AuthContext.Provider value={{ authTokens, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};
