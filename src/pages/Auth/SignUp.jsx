import {useState,useContext} from 'react';
import './Auth.css'
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Hooks/InfoContext';
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
            <div className='auth-container'>
                <h1 className='logo'>
                    EcoHaul
                </h1>
               <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Signin to EcoHaul</h1>
                    <label>Name</label>
                    <input type='text' onChange={(e)=>setUserName(e.target.value)} placeholder='Emmanuel Nyatepe'/>
                    <label>Phone</label>
                    <input type='tel' pattern='[0-9]{3}-[0-9]{4}-[0-9]{3}' onChange={(e)=>setPhone(e.target.value)} placeholder='023-4554-678'/>
                    <label>Email</label>
                    <input type='text' onChange={(e)=>setEmail(e.target.value)} placeholder='hello@gmail.com'/>
                    <label>Password</label>
                    <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                    <Link to="/" className='forgot-pwd'>Already Have An Account? Log in</Link>
                    <button type='submit'>Sign up</button>         
                </form>
               </div>
            </div>
        </div>
    );
}

export default SignUp;