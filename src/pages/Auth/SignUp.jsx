import {useState} from 'react';
import './Auth.css'
import { Link } from 'react-router-dom';

function SignUp() {
    const [email,setEmail]= useState("");
    const [name,setName]= useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
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
                    <input type='tel' pattern='[0-9]{3}-[0-9]{4}-[0-9]{3}' placeholder='023-4554-678'/>
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