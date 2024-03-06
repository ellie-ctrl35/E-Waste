import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRequests, setUserRequests] = useState([]);
  const [streamToken,setStreamtoken] = useState("")

  const Login = (email, password) => {
    try {
      return axios.post("http://localhost:5000/api/auth/login", { email, password })
      .then((res) => {
        console.log(res);
        const { email, role, token, username,streamToken,id,comAssociate } = res.data;
        const UserInfo = { email, role, username,id,comAssociate };
        console.log(UserInfo);
        setUserInfo(UserInfo);
        console.log(streamToken)
        setUserToken(token);
        setStreamtoken(streamToken)
        localStorage.setItem("userInfo", JSON.stringify(UserInfo));
        localStorage.setItem("userToken", token);
        localStorage.setItem("streamToken", streamToken);
        fetchUserRequests(email);
      })
      .catch((error) => {
        console.error("Login error from infoContext", error);
        setLoading(false);
        throw error;
      });
    } catch (error) {
      console.log("error from frontend")
    }
  };
  

  // Helper function to clear user info and token
  const clearUserInfo = () => {
    setUserToken(null);
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
  };

  const fetchUserRequests = (email) => {
    axios.get(`http://localhost:5000/api/request/userhistory?author=${email}`)
      .then(res => setUserRequests(res.data))
      .catch(error => console.error("Error fetching user requests", error));
  };

  const register = (username, email, password, phone, role, comAssociate,lat,long) => {
    return axios.post("http://localhost:5000/api/auth/register", { username, email, password, phone, role, comAssociate,lat,long})
      .then(res => res.status === 200 && console.log("Registration successful"))
      .catch(error => console.error("Registration error in InfoContext", error));
  };

 {/* const login = (email, password) => {
    return axios.post("http://localhost:5000/api/auth/login", { email, password })
      .then((res) => {
        const { email, role, token, username } = res.data;
        setInfo({ email, role, username });
        setToken(token);
        fetchUserRequests(email);
      })
      .catch(error => {
        console.error("Login error", error);
        setLoading(false);
        throw error;
      });
  };*/}

  const logout = () => {
    setLoading(true);
    clearUserInfo();
    setLoading(false);
  };

  const isLogged = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("userToken");
    if (storedUserInfo && storedToken) {
      setUserInfo(JSON.parse(storedUserInfo));
      setUserToken(storedToken);
    }
    setLoading(false);
  };

useEffect(() =>{ isLogged()}, []);

  return (
    <AuthContext.Provider value={{ Login, logout, isLoading, userToken, userInfo, userRequests, register,isLogged}}>
      {children}
    </AuthContext.Provider>
  );
};
