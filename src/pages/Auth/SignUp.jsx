import {useState,useContext} from 'react';
import './Auth.css'
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Hooks/InfoContext';
import Logo from '../../resources/EcoHaul.svg'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import HashTagicon from '@heroicons/react/24/outline/HashtagIcon';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import LockClosedIcon from '@heroicons/react/24/outline/LockClosedIcon';

function SignUp() {
    const [email,setEmail]= useState("");
    const [username,setUserName]= useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const navigate = useNavigate();

    const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password, phone);
    navigate('/');
  };
    return (
        <div className='container'>
            <div className='logo-container'>
                <img style={{marginLeft:"3%"}} src={Logo}/>
            </div>
               <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Sign up into EcoHaul</h1>
                    <h2>Let’s get you started. Create your account to register with us.</h2>
                    <div className='input-group'>
                      <UserCircleIcon style={{width:"10%",height:"45%",marginLeft:"2%"}}/>
                        <input type='text' onChange={(e)=>setUserName(e.target.value)} placeholder='Name'/>
                    </div>
                 
                    <div className='input-group'>
                        <HashTagicon style={{width:"10%",height:"45%",marginLeft:"2%"}}/>
                        <input type='tel' onChange={(e)=>setPhone(e.target.value)} placeholder='Phone Number'/>
                    </div>
                   
                    <div className='input-group'>
                        <EnvelopeIcon style={{width:"10%",height:"45%",marginLeft:"2%"}}/>
                        <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='E-Mail'/>
                    </div>
        
                    <div className='input-group'>
                        <LockClosedIcon style={{width:"10%",height:"45%",marginLeft:"2%"}}/>
                        <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                    </div>
                
                    <h3>
                    By continuing, you agree with our <br/> Terms & Conditions
                    </h3>
                    <button type='submit'>Sign up</button>    
                    <h3>Already have an account? 
                            <Link to='/signup' style={{color:"#6E6D7A",fontWeight:600,fontFamily:'Inter',textDecoration:'none'}}> Sign in</Link>
                        </h3>     
                </form>
               </div>
        </div>
    );
}

export default SignUp;