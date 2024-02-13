import {useMemo} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap} from '@react-google-maps/api'

const center = {
    lat: 37.7749,
    lng: -122.4194
}

function UserHome() {
    const loaderOptions = useMemo(() => ({
        googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4"
        // Add other consistent options here if necessary
    }), []);

    const { isLoaded } = useJsApiLoader(loaderOptions);
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className='App'>
            <div className='Mapbox'>
              <GoogleMap zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}}>

              </GoogleMap>
            </div>
        </div>
    );
}

export default UserHome;