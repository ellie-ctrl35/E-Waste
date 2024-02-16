import React from 'react';
import './Auth.css'

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
                    <input type='text' placeholder='hello@gmail.com'/>
                    <input type='password' placeholder='Password'/>
                    <button type='submit'>Login</button>
                    <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
                </form>
               </div>
            </div>
        </div>
    );
}

export default Login;