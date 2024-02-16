import React from 'react';
import './Auth.css'
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <div className='container'>
            <div className='auth-container'>
                <h1 className='logo'>
                    EcoHaul
                </h1>
               <div className='form-container'>
                <form>
                    <h1>Login to EcoHaul</h1>
                    <label>Name</label>
                    <input type='text' placeholder='Emmanuel Nyatepe'/>
                    <label>Phone</label>
                    <input type='number' placeholder='hello@gmail.com'/>
                    <label>Email</label>
                    <input type='text' placeholder='hello@gmail.com'/>
                    <label>Password</label>
                    <input type='password' placeholder='Your Password'/>
                    <Link to="/login" className='forgot-pwd'>Already Have An Account? Log in</Link>
                    <button type='submit'>Sign up</button>
                    
                </form>
               </div>
            </div>
        </div>
    );
}

export default SignUp;