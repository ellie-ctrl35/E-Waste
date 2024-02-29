import {useContext, useEffect, useMemo,useState} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap,Marker,InfoWindow,Autocomplete} from '@react-google-maps/api';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import notification from '../../resources/notification.png';
import backBtn from '../../resources/backIcon.png';
import { AuthContext } from '../../Hooks/InfoContext';

const center = {
    lat:   5.614818,
    lng: -0.205874
}

function AdminHome() {
    const {logout ,userInfo}= useContext(AuthContext)
    const [requests,setRequest]= useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const username = userInfo.username;

    const loaderOptions = useMemo(() => ({
        googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4"
        
    }), []);

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = () => {
        axios.get('http://localhost:5000/api/request/allrequests')
            .then(response => {
                setRequest(response.data);
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

    const { isLoaded } = useJsApiLoader(loaderOptions);
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    const handleMarkerClick = (request) => {
        setSelectedRequest(request);
    };
    const greenMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    const redMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    
    return (
        <div className='App' style={{position:"relative"}}>
             <div className='AdminMapbox'>
              <GoogleMap zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}} >   
                <div className='mapnav'>
                <Link to="/admindriver" className='backBtn2'>
                  <img src={backBtn} alt='notification'/>  
                </Link>
                
                <input placeholder='Search location' className='location-search'/>
              
                <div className='profile-left'>
                    <img src={notification} alt='notification'/>
                    <Avatar name={username} size="30" round={true} />
                </div>
                </div>

                <div style={{width:"3%",height:"6%",background:"#1C3530",position:"absolute",top:"80%",left:"2%"}} onClick={()=>logout()}></div>
                {requests.map(request => (
    <Marker
        key={request._id}
        position={{ lat: request.lat, lng: request.long }}
        onClick={() => handleMarkerClick(request)}
        icon={request.status === "completed" ? greenMarkerIcon : redMarkerIcon}
    />
))}

                
                {selectedRequest && (
                        <InfoWindow 
                       
                            position={{ lat: selectedRequest.lat, lng: selectedRequest.long }}
                            onCloseClick={() => setSelectedRequest(null)}
                            icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} // URL to your custom marker image
                            
                            
                        >
                            <div style={{background:"dodgerblue",width:"100%",height:"100%"}} >
                                <h3 style={{color:'black'}}>{selectedRequest.username}</h3>
                                <p style={{color:'black'}}>Date Created: {selectedRequest.dateCreated}</p>
                                <p style={{color:'black'}}>Status: {selectedRequest.status}</p>
                            </div>
                        </InfoWindow>
                )}

                </GoogleMap>

             </div>

        </div>
    );
}

export default AdminHome;