import React from 'react';
import './Navbar.css'
import logo from '../resources/logo.png'
import logout from '../resources/logout.png'
import homeIcon from '../resources/homeIcon.png'
import RequestIcon from '../resources/RequestIcon.png'
import {Link} from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className='navbar'>
    <div className='logo-container'>
        <img src={logo} className='logo' alt='logo'/>
    </div>
    <div className='nav-items'>
        <ul>
            <Link className='nav-links' to='/admindash'>
                <img src={homeIcon} className='logout' alt='logout'/>
                Dashboard
            </Link>
            <Link className='nav-links' to='/admin'>
                <img src={RequestIcon} className='logout' alt='logout'/>
                Haul Requests
            </Link>
            <Link className='nav-links' to='/admindrive'>
                <img src={RequestIcon} className='logout' alt='logout'/>
                My Drivers
            </Link>
            <Link className='nav-links' to='/makerequest'>
                <img src={RequestIcon} className='logout' alt='logout'/>
                Haul History
            </Link>
        
        </ul>
    </div>
    <div className='logout-container'>
       <Link>
       <img src={RequestIcon} className='logout' alt='logout'/>
       Logout
       </Link>
    </div>
</div>
  )
}

export default AdminNavbar