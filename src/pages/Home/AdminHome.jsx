import {useEffect, useMemo,useState} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap} from '@react-google-maps/api';
import axios from 'axios';

const center = {
    lat:  8.00000000,
    lng: -2.00000000
}

function AdminHome() {

    const [request,setRequest]= useState(null)
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

    return (
        <div>
            <GoogleMap
               zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}}
               onDblClick={handleMapClick}
            >
             
            </GoogleMap>
        </div>
    );
}

export default AdminHome;