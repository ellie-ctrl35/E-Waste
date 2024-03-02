import React from 'react'
import './Chat.css'
import AdminNavbar from '../../components/AdminNavbar';
import Avatar from 'react-avatar'
import { AuthContext } from '../../Hooks/InfoContext';
import { useContext } from 'react';

const Chat = () => {
    const {userInfo}= useContext(AuthContext)
  return (
    <div className='container'>
        <AdminNavbar/>
        <div className='right-side'>
            
        </div>
    </div>
  )
}

export default Chat