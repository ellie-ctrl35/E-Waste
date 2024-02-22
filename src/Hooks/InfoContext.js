import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRequests, setUserRequests] = useState([]);

  const fetchUserRequests = (email) => {
    axios
      .get(`http://172.20.10.5:5000/api/request/userhistory?author=${email}`)
      .then((res) => {
        setUserRequests(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user requests", error);
      });
  };

  const register = (username, email, password, phone) => {
    return axios
      .post("http://localhost:5000/api/auth/register", { username, email, password, phone })
      .then(res => {
        if (res.status === 200) {
          // Assuming the server responds with a success message and you want to redirect to login
          console.log("Registration successful");
        }
      })
      .catch(error => {
        console.error("Registration error", error);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    return axios
      .post("http://172.20.10.5:5000/api/auth/login", { email, password })
      .then((res) => {
        const { email, role, token, username } = res.data;
        const userInfo = { email, role, username };
        setUserInfo(userInfo);
        setUserToken(token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("userToken", token);
        if (email) {
          fetchUserRequests(email);
        }
      })
      .catch((error) => {
        console.error("Login error", error);
        setLoading(false);
        throw error; // Throw the error to be caught in Login.jsx
      });
  };

  const logout = () => {
    setLoading(true);
    setUserToken(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    setLoading(false);
  };

  const isLogged = () => {
    setLoading(true);
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("userToken");
    if (storedUserInfo && storedToken) {
      setUserInfo(JSON.parse(storedUserInfo));
      setUserToken(storedToken);
    }
    setLoading(false);
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo, userRequests,isLogged,register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
