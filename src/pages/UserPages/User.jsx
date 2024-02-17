import Navbar from '../../components/Navbar';
import'../../App.css';
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { UserContext } from '../../App';
import {useState,useContext} from 'react';
import axios from 'axios';

function User() {
    const user = useContext(UserContext);
    const user_id = user.user_id;
    const username = user.username;
    return (
        <div className='App'>
            <Navbar />
            <div className='right-side'>
                <div className='top-div'>
                    <div className='search-container'>
                        <img src={searchIcon} alt="search" />
                        <input type="text" placeholder="Search for a location" />
                    </div>
                    <div className='icongroup'>
                        <img src={notification} alt='notification'/>
                        <Avatar name={username} size="40" round={true} />
                    </div>
                </div>
                <div className='welcome-div'>
                    <div className='top'></div>
                    <div></div>
                </div>

                <div className='history-box'>
                 <ul>
                   <div></div>
                 </ul>
                </div>

            </div>
        </div>
    );
}

export default User;