import {useState,useContext} from 'react';
import './Auth.css'
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../../resources/EcoHaul.svg';
import { AuthContext } from '../../Hooks/InfoContext'; 
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import LockClosedIcon from '@heroicons/react/24/outline/LockClosedIcon';

function Login() {
    const { Login } = useContext(AuthContext); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(email, password)
        .then(() => {
            navigate('/'); // Navigate to the desired route after successful login
          })
          .catch(err => {
            console.log('Login error: from Login.jsx', err);
        });
    };
    return (
        <div className='container'>
            <div className='logo-container'>
                <img style={{marginLeft:"3%"}} src={Logo}/>
            </div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Login into EcoHaul</h1>
                    <h2>Welcome back!! Kindly sign-in to access your account.</h2>
                    <label>Email*</label>
                    <div className='input-group'>
                        <EnvelopeIcon style={{width:"10%",height:"45%",marginLeft:"2%"}}/>
                        <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                    </div>
                    <label>Password*</label>
                    <div className='input-group'>
                        <LockClosedIcon style={{width:"10%",height:"45%",marginLeft:"2%"}}/>
                        <input type='text' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                    </div>
                    <h3>
                        Click the link below to reset login credentials
                    </h3>
                    <Link style={{textAlign:"center",color:"#6E6D7A",fontWeight:600,fontFamily:'Inter',textDecoration:'none',fontSize:'0.9rem'}} to='/signup' className='forgot-pwd'>Forgot Password?</Link>
                    <button type='submit'>Log in</button>
                        <h3>Don't have an account? 
                            <Link to='/signup' style={{color:"#6E6D7A",fontWeight:600,fontFamily:'Inter',textDecoration:'none'}}> Sign up</Link>
                        </h3>
                </form>
            </div>
        </div>
    );
}

export default Login;