import Navbar from '../../components/Navbar';
import'../../App.css';
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';
import {useState,useContext,useEffect} from 'react';
import axios from 'axios';

function User() {
    const [requests, setRequests] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const { userInfo } = useContext(AuthContext);
    const username = userInfo.username;

    {/*useEffect(() => {
            const fetchRequests = async () => {
                if (!userId) {
                    console.log('User ID is not available');
                    return;
                  }
                try {
                    axios.get(`http://localhost:5000/requests/${userId}`)
                    .then(response => {
                      // Handle the response containing the requests
                      console.log(response.data);
                    })
                } catch (error) {
                    console.error('Error fetching requests:', error);
                }
            };
            fetchRequests();
    }, [userId]);*/}
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
                        <button>Make Request</button>
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
                 <ul>
                   <div></div>
                 </ul>
                </div>

            </div>
        </div>
    );
}

export default User;