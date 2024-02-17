import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import UserHome from './pages/UserPages/UserHome';
import AdminHome from './pages/Admin/AdminHome';
import User from './pages/UserPages/User';
import { createContext } from 'react';

export const UserContext = createContext();

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/admin" element={<AdminHome />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path='/userhome' element={<User/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
