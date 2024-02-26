import {useState,useContext} from 'react';
import './Auth.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Hooks/InfoContext'; 

function Login() {
    const { Login } = useContext(AuthContext); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(email, password)
          .then(() => {
            navigate('/makerequest'); // Navigate to the desired route after successful login
          })
          .catch(err => {
            console.log('Login error:', err);
          });
      };
      
    
    
    return (
        <div className='container'>
            <div className='auth-container'>
                <h1 className='logo'>
                    EcoHaul
                </h1>
               <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Login to EcoHaul</h1>
                    <label>Email</label>
                    <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='hello@gmail.com'/>
                    <label>Password</label>
                    <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                    <Link to='/signup' className='forgot-pwd'>Forgot Password?</Link>
                    <button type='submit'>Log in</button>
                </form>
               </div>
            </div>
        </div>
    );
}

export default Login;