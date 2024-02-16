import {useMemo,useState} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap,Marker} from '@react-google-maps/api';
import backBtn from '../../resources/backBtn.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Avatar from 'react-avatar';
import LiveLocation from '../../resources/LiveLocation.png';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';

const center = {
    lat:   5.614818,
    lng: -0.205874
}

function UserHome() {
    const [long, setLong] = useState(0);
    const [placeName, setPlaceName] = useState('Place Name');
    const username = 'username';       // replace with actual username logic
   const number = '1234567890';       // replace with actual number logic
   const [lat, setLat] = useState(0);


    const loaderOptions = useMemo(() => ({
        googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4"
       
    }), []);

    const handleMapClick = (event) => {
         setLong(event.latLng.lng());
         setLat(event.latLng.lat());
         setPlaceName('Place Name');
    //    setLocation({
    //        lat: event.latLng.lat(),
      //      lng: event.latLng.lng(),
      //      name: 'Place Name' // Replace this with actual place name retrieval logic if available
    //    });
    };

   const sendLocationData = () => {
        const data = {
            username,
            number,
            lat,
            long,
            placeName
        };

        axios.post('http://localhost:5000/api/request', data)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            console.log(data);
    };

    const getUserLocation = () => {
        try{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                }, () => {
                    console.error('Error: The Geolocation service failed.');
                });
                console.log("Current location gotten")
            } else {
                console.error('Error: Your browser doesn\'t support geolocation.');
            }
        }
        catch(err){
            console.log('Geolocation failed');
        }
    };

    const { isLoaded } = useJsApiLoader(loaderOptions);
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className='App'>
            <Navbar/>
            <div className='right-side'>
                <div className='top-div'>
                    <div className='search-container'>
                        <img src={searchIcon} alt="search" />
                        <input type="text" placeholder="Search for a location" />
                    </div>
                    <div className='icongroup'>
                        <img src={notification} alt='notification'/>
                        <Avatar name="Emmanuel Nyatepe" size="40" round={true} />
                    </div>
                </div>
                <div className='mid-div'>
                    <Link className='mid-div-link'>
                     <img src={backBtn}/>
                    </Link>
                    <div className='mid-div-bottom'>
                       <div className='texts'>
                        <h1>Put in a Haul Request</h1>
                        <h2>Select a location from map for waste pickup</h2>
                       </div>
                       <button onClick={sendLocationData} className='request-btn'>Make a Request</button>
                    </div>
                </div>
              <div className='Mapbox'>
                <GoogleMap
                 options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                  }}
                 zoom={11.5} center={center} mapContainerStyle={{width:"100%",height:"100%",borderRadius:"0.6rem"}}
                 onDblClick={handleMapClick}
                >
                  {
                    lat !== 0 && long !== 0 && (
                        <Marker position={{lat, lng: long}} />
                    )
                  }
                </GoogleMap>
               </div>
            </div>
            <button onClick={getUserLocation} className='location-btn'>
                <img src={LiveLocation} alt="location" />
            </button>
        </div>
    );
}

export default UserHome;