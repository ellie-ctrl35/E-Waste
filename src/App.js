import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import UserHome from './pages/UserPages/UserHome';
import AdminHome from './pages/Admin/AdminHome';
import AdminDrive from './pages/Admin/AdminDrive';
import User from './pages/UserPages/User';
import  AdminDash  from './pages/Admin/AdminDash';
import { AuthContext, AuthProvider } from './Hooks/InfoContext'; // Import AuthContext

function App() {
  const { userToken, userInfo, isLogged } = useContext(AuthContext);

  useEffect(() => { 
    isLogged(); 
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          {userToken ? (
            // If the user is logged in
            userInfo.role === 'user' ? (
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
                <Route path='/admindash' element={<AdminDash/>}/>
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
      </BrowserRouter>
  );
}

export default App;
