import {useMemo,useState} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap} from '@react-google-maps/api';
import axios from 'axios';

const center = {
    lat:  8.00000000,
    lng: -2.00000000
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

        axios.post('YOUR_API_ENDPOINT', data)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            console.log(data);
    };

    const { isLoaded } = useJsApiLoader(loaderOptions);
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className='App'>
            <div className='Mapbox'>
             <GoogleMap
               zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}}
               onDblClick={handleMapClick}
               >

    </GoogleMap>
            </div>
            <button onClick={sendLocationData} className='location-btn'>Send Location</button>
        </div>
    );
}

export default UserHome;