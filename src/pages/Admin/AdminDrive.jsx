import React from 'react'
import'../../App.css';
import AdminNavbar from '../../components/AdminNavbar';
import notification from '../../resources/notification.png'
import Avatar from 'react-avatar'

const AdminDrive = () => {
  return (
    <div className='App'>
      <AdminNavbar/>
      <div className='right-side'>
        <div className='comNamediv'>
          <h1 className='comtxt'>Company Name</h1>
          <div className='profileContainer'>
            <img src={notification} alt='noti'/>
            <Avatar size={40} name='Emmanuel Nyatepe' round/>
          </div>
        </div>
        <div className='bigdiv'>
          <div className='leftbigdiv'>

          </div>
          <form>
            <label className='labelS'>Add a driver to your company</label>
            <label className='labelH'>Name*</label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminDrive;

