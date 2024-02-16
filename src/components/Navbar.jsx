import React from 'react';
import './Navbar.css'
import logo from '../resources/logo.png'
import logout from '../resources/logout.png'
import {Link} from 'react-router-dom'
const  Navbar = (props) =>{
    return (
        <div className='navbar'>
            <div className='logo-container'>
                <img src={logo} className='logo' alt='logo'/>
            </div>
            <div className='nav-items'>
                <ul>
                    <Link className='nav-links' to='/'>Homepage</Link>
                    <Link className='nav-links' to='/about'>Make Request</Link>
                    <Link className='nav-links' to='/services'>Services</Link>
                </ul>
            </div>
            <div className='logout-container'>
               <Link></Link>
            </div>
        </div>
    );
}

export default Navbar;