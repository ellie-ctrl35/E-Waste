import {useMemo,useState} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap,Marker} from '@react-google-maps/api';
import axios from 'axios';
import Navbar from '../../components/Navbar';

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
              <div className='Mapbox'>
                <GoogleMap
                 zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}}
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
            <button onClick={sendLocationData} className='location-btn'>Send Location</button>
            <button onClick={getUserLocation} className='location-btn'>Use My Location</button>
        </div>
    );
}

export default UserHome;