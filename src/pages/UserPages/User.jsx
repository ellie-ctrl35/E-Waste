import Navbar from '../../components/Navbar';
import'../../App.css';
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';
import {useState,useContext,useEffect} from 'react';
import axios from 'axios';
import TimeAgo from 'timeago'

function User() {
    const [requests, setRequests] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const { userInfo } = useContext(AuthContext);
    const username = userInfo.username;
    const email = userInfo.email;
    const [history,setHistory] = useState([]);

    useEffect(() => {
        if (email) {
            console.log('Fetching user requests for email:', email);
            axios.get(`http://172.20.10.5:5000/api/request/userhistory?author=${email}`)
                .then(res => {
                    console.log("User requests:", res.data);
                    setHistory(res.data);
                })
                .catch(error => {
                    console.error("Error fetching user requests", error);
                });
        }
    }, [email]);


    return (
        <div className='App'>
            <Navbar />
            <div className='right-side'>
                <div className='top-div'>
                    <div className='icongroup'>
                        <img src={notification} alt='notification'/>
                        <Avatar name={username} size="40" round={true} />
                    </div>
                </div>
                <div className='welcome-div'>
                    <div className='top'>
                        <h1>Homepage</h1>
                        <button className='weird-btn'>Make Request</button>
                    </div>
                    <div className='bottom'>
                        <h2>Welcome back,<br/> 
                        <span>
                            {username}
                        </span>
                        <br/><br/><br/>Get a snipshot of your request history</h2>
                    </div>
                </div>

                <div className='history-box'>
                    <h1 style={{fontWeight:500,fontSize:"0.9rem",fontFamily:"Inter",color:"black",marginRight:"86%"}}>Haul History</h1>
                    <div className='history-headers'>
                        <h2>Haul ID</h2>
                        <h2>Location</h2>
                        <h2>Time</h2>
                        <h2>Status</h2>
                    </div>
                 <ul>
                        {history.map(request => (
                            <div key={request._id} className='history-div'>
                                <span>{request._id}</span>
                                <span>{request.type}</span>
                                <span>{request.createdAt}</span>
                                <span>{request.status}</span>
                            </div>
                        ))}
                 </ul>
                </div>

            </div>
        </div>
    );
}

export default User;