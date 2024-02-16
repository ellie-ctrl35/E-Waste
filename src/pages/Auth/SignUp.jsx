import {useState} from 'react';
import './Auth.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [email,setEmail]= useState("");
    const [name,setName]= useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
     axios
     .post("http://localhost:5000/api/auth/register", { name, email, password,phone })
     .then(res => {
       if (res.status === 200) {
         navigate('/login');
       }
     })
     .catch((err) => console.log(err));
   }

    return (
        <div className='container'>
            <div className='auth-container'>
                <h1 className='logo'>
                    EcoHaul
                </h1>
               <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Login to EcoHaul</h1>
                    <label>Name</label>
                    <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Emmanuel Nyatepe'/>
                    <label>Phone</label>
                    <input type='tel' pattern='[0-9]{3}-[0-9]{4}-[0-9]{3}' onChange={(e)=>setPhone(e.target.value)} placeholder='023-4554-678'/>
                    <label>Email</label>
                    <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='hello@gmail.com'/>
                    <label>Password</label>
                    <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                    <Link to="/login" className='forgot-pwd'>Already Have An Account? Log in</Link>
                    <button type='submit'>Sign up</button>         
                </form>
               </div>
            </div>
        </div>
    );
}

export default SignUp;