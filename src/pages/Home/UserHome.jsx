import {useMemo} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap} from '@react-google-maps/api';
import axios from 'axios';

const center = {
    lat: 37.7749,
    lng: -122.4194
}

function UserHome() {
    const [username, setUsername] = useState('someUsername'); // replace with actual username logic
    const [number, setNumber] = useState('1234567890');       // replace with actual number logic
    const [location, setLocation] = useState({ lat: null, lng: null, name: null });


    const loaderOptions = useMemo(() => ({
        googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4"
        // Add other consistent options here if necessary
    }), []);

    const handleMapClick = (event) => {
        setLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            name: 'Place Name' // Replace this with actual place name retrieval logic if available
        });
    };

    const sendLocationData = () => {
        const data = {
            username,
            number,
            location
        };

        axios.post('YOUR_API_ENDPOINT', data)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
            <button onClick={sendLocationData}>Send Location</button>
        </div>
    );
}

export default UserHome;