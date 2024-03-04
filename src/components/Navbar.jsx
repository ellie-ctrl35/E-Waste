import React from 'react';
import './Navbar.css'
import logo from '../resources/logo.png'
import logout from '../resources/logout.png'
import homeIcon from '../resources/homeIcon.png'
import RequestIcon from '../resources/RequestIcon.png'
import {Link} from 'react-router-dom'
import { AuthContext } from '../Hooks/InfoContext';
import { useContext } from 'react';
const  Navbar = (props) =>{
    const {logout}= useContext(AuthContext)
    return (
        <div className='navbar'>
            <div className='logo-container'>
                <img src={logo} className='logo' alt='logo'/>
            </div>
            <div className='nav-items'>
                <ul>
                    <Link className='nav-links' to='/userhome'>
                        <img src={homeIcon} className='logout' alt='logout'/>
                        Homepage
                    </Link>
                    <Link className='nav-links' to='/makerequest'>
                        <img src={RequestIcon} className='logout' alt='logout'/>
                        Make Request
                    </Link>
                </ul>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"50%",height:"",alignItems:"center",justifyContent:"space-evenly",marginBottom:"12%",marginLeft:"4%"}}>
            <img src={RequestIcon} className='logout' alt='logout'/>
              <Link style={{textDecoration:"none",fontFamily:"Inter",fontSize:"1rem",color:"white"}}  onClick={()=>logout()}>
               Logout
              </Link>
            </div>
        </div>
    );
}

export default Navbar;