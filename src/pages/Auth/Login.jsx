import {useState,useContext} from 'react';
import './Auth.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Hooks/InfoContext'; 
import GreenLogo from '../../resources/logo-green.svg'



function Login() {
    const { Login } = useContext(AuthContext); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(email, password)
          .then(() => {
            navigate('/'); // Navigate to the desired route after successful login
          })
          .catch(err => {
            console.log('Login error:', err);
          });
      };
      
    
    
    return (
        <div className='container'>
            <div className='logo-container'>
                <img src={GreenLogo} alt='Logo'/>
            </div>
            <div className='login-content'>
                <div className='login-welcome-content'>
                  <h1>Login to EcoHaul</h1>
                  <p>Welcome back!! Kindly sign-in to access your account.</p>
                </div>
            <form onSubmit={handleSubmit} className='form'>
                <div className='Email-Password-container'></div>
                <div className='Email-container'>
                  <label>Email*</label>
                  <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='hello@gmail.com'/>
                </div>
                <div className='Password-container'>
                    <label>Password*</label>
                    <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                </div>
                    
                    
                    <Link to='/signup' className='forgot-pwd'>Forgot Password?</Link>
                    <button type='submit'>Log in</button>
            </form>
            </div>
        </div>
    );
}

export default Login;