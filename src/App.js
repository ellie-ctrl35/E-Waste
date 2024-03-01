import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SplashScreen from "./pages/SplashScreen/SplashScreen"; // Import SplashScreen component
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserHome from "./pages/UserPages/UserHome";
import AdminHome from "./pages/Admin/AdminHome";
import AdminDrive from "./pages/Admin/AdminDrive";
import User from "./pages/UserPages/User";
import AdminDash from "./pages/Admin/AdminDash";
import { AuthContext } from "./Hooks/InfoContext"; // Import AuthContext

function App() {
  const { userToken, userInfo, isLogged } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isLogged();
  }, []);

  // Simulate a loading state for 3 seconds before showing the app content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? ( // Show SplashScreen while loading
        <SplashScreen />
      ) : (
        <Routes>
          {userToken ? (
            // If the user is logged in
            userInfo.role === "user" ? (
              // If the user is a regular user
              <>
                <Route path="/makerequest" element={<UserHome />} />
                <Route path="/userhome" element={<User />} />
                <Route path="/" element={<Navigate replace to="/userhome" />} />
              </>
            ) : (
              // If the user is an admin
              <>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admindriver" element={<AdminDrive />} />
                <Route path="/admindash" element={<AdminDash />} />
                <Route path="/" element={<Navigate replace to="/admin" />} />
              </>
            )
          ) : (
            // If the user is not logged in
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
