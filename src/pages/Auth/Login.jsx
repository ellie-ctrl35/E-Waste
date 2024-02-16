import React from 'react';
import './Auth.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className='container'>
            <div className='auth-container'>
                <h1 className='logo'>
                    EcoHaul
                </h1>
               <div className='form-container'>
                <form>
                    <h1>Login to EcoHaul</h1>
                    <label>Email</label>
                    <input type='text' placeholder='hello@gmail.com'/>
                    <label>Password</label>
                    <input type='password' placeholder='Your Password'/>
                    <Link className='forgot-pwd'>Forgot Password?</Link>
                    <button type='submit'>Log in</button>
                    
                </form>
               </div>
            </div>
        </div>
    );
}

export default Login;