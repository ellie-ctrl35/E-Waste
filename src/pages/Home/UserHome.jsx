import React from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap} from '@react-google-maps/api'
function UserHome() {

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className='App'>
            <div className='Mapbox'>
              <GoogleMap>
                
              </GoogleMap>
            </div>
        </div>
    );
}

export default UserHome;