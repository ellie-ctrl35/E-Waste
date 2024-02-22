import {useContext, useEffect, useMemo,useState} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import notification from '../../resources/notification.png';
import backBtn from '../../resources/backIcon.png';


const center = {
    lat:   5.614818,
    lng: -0.205874
}

function AdminHome() {

    const [requests,setRequest]= useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

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

    return (
        <div className='App' style={{position:"relative"}}>
             <div className='AdminMapbox'>
              <GoogleMap
               zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}}
               
            >   
                <div className='mapnav'>
                <Link to="/admindriver" className='backBtn2'>
                  <img src={backBtn} alt='notification'/>  
                </Link>
                <input placeholder='Search location' className='location-search'/>
                <div className='profile-left'>
                    <img src={notification} alt='notification'/>
                    <Avatar name='Emmanuel Nyatepe' size="30" round={true} />
                </div>
                </div>
                {requests.map(request => (
                    <Marker
                        key={request._id} // Replace 'id' with the actual unique identifier of the request
                        position={{ lat: request.lat, lng: request.long }}
                        onClick={() => handleMarkerClick(request)}
                    />
                ))}
                
                {selectedRequest && (
                        <InfoWindow 
                        style={{width:"40%",height:"40%"}}
                            position={{ lat: selectedRequest.lat, lng: selectedRequest.long }}
                            onCloseClick={() => setSelectedRequest(null)}
                        >
                            <div className='infobox'>
                                <h3>{selectedRequest.username}</h3>
                                <p>Date Created: {selectedRequest.dateCreated}</p>
                                <p>Status: {selectedRequest.status}</p>
                            </div>
                        </InfoWindow>
                )}

                </GoogleMap>

             </div>

        </div>
    );
}

export default AdminHome;