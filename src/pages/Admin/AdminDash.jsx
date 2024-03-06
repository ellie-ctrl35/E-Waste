import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';
import AdminNavbar from '../../components/AdminNavbar';
import PieChart from './PieChart';
import BarChart from './BarChart';


function AdminDash() {
  const [requests, setRequests] = useState([]);
  const {register,userInfo}= useContext(AuthContext);
  const Username = userInfo.username;
  

    return (
        <div className='App'>
            <AdminNavbar />
            <div className='right-side'>
              <div className='dashtop'>
                <img src={notification} alt='notification'/>
                <Avatar round size={35} name={Username}/>
              </div>
              <div className='barchartdiv'>
                <BarChart/>
              </div>
              <div className='dashbottom'>
                <div className='bottomdash-left'></div>
                <div className='doughnut-div'>
                  <h1 style={{position:"absolute",color:"black",fontSize:"1.2rem",marginLeft:"0.7rem",fontFamily:"Inter"}}>Total - </h1>
                  <div className='doughnut'>
                  <PieChart/>
                  </div>
                </div>
              </div>
             {/* <div style={{height:'20%',width:"20%"}}>
              
    </div>*/}
 
            </div>
        </div>
    );
}

export default AdminDash;