import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';
import AdminNavbar from '../../components/AdminNavbar';


function AdminDash() {
  const [requests, setRequests] = useState([]);
  const {register,userInfo}= useContext(AuthContext);
  const Username = userInfo.username;
  

    return (
        <div className='App'>
            <AdminNavbar />
            <div className='right-side'>
            
  
 
            </div>
        </div>
    );
}

export default AdminDash;