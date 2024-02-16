import React from 'react';
import './Navbar.css'
const  Navbar = (props) =>{
    return (
        <div className='navbar'>
            <div className='logo'>
                EcoHaul
            </div>
            <div className='nav-items'>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className='logout-container'>
               
            </div>
        </div>
    );
}

export default Navbar;