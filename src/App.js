import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import UserHome from './pages/UserPages/UserHome';
import AdminHome from './pages/Admin/AdminHome';
import AdminDrive from './pages/Admin/AdminDrive';
import User from './pages/UserPages/User';
import { createContext ,useEffect,useState} from 'react';
import axios from 'axios';

export const UserContext = createContext();

function App() {
const [user,setUser] = useState({})

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:5000/verifyuser')
    .then(user=>{
      setUser(user.data)
      console.log(user.data)
    })
  },[])
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/makerequest" element={<UserHome />} />
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path='/userhome' element={<User/>}/>
          <Route path='/admindriver' element={<AdminDrive/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
