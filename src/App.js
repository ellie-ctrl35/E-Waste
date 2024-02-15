import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import UserHome from './pages/UserPages/UserHome';
import AdminHome from './pages/Admin/AdminHome';
import UserPage from './pages/UserPages/UserPage';

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/admin" element={<AdminHome />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path='/userhome' element={<UserPage/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
