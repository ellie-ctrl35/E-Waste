import {useEffect,useMemo,useState,useContext} from 'react';
import'../../App.css';
import {useJsApiLoader,GoogleMap,Marker,Autocomplete} from '@react-google-maps/api';
import backBtn from '../../resources/backBtn.png';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Avatar from 'react-avatar';
import LiveLocation from '../../resources/LiveLocation.png';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';

const center = {
    lat:   5.614818,
    lng: -0.205874
}


function UserHome() {
    const { userInfo } = useContext(AuthContext);
    const username = userInfo.username; 
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [autocompleteInstance, setAutocompleteInstance] = useState(null);

    const [type, setType] = useState('');
    const [long, setLong] = useState(0);     
    const [lat, setLat] = useState(0);
    const navigate = useNavigate();
    
    const WasteTypeModal = () => (
        <div className="modal"> {/* You'll need to style this accordingly */}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleTypeSelect(e.target.type.value);
            }}>
                <label htmlFor="type">Select Waste Type:</label>
                <select name="type" id="type">
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="Paper">Paper</option>
                    {/* Add more options as needed */}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
   const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setIsModalOpen(false);
};

    const loaderOptions = useMemo(() => ({
        googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4" ,libraries: ['places'],
    }), []);

    const handleMapClick = (event) => {
         setLong(event.latLng.lng());
         setLat(event.latLng.lat());
    //    setLocation({
    //        lat: event.latLng.lat(),
      //      lng: event.latLng.lng(),
      //      name: 'Place Name' // Replace this with actual place name retrieval logic if available
    //    });
    };

   const sendLocationData = () => {
        const data = {
            lat,
            long,
            type
        };

        axios.post('http://localhost:5000/api/request', data)
            .then(response => {
                navigate('/userhome'); 
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
           // console.log(user)
    };
    const onPlaceSelected = () => {
        if (autocompleteInstance) {
            const place = autocompleteInstance.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            setSearchedLocation({ lat, lng });
            setLat(lat);
            setLong(lng);
        }
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

{isModalOpen && <WasteTypeModal />}

{/* Main screen content - only show if modal is not open */}
{!isModalOpen && (
    < >
            <div className='right-side'>
                <div className='top-div'>
                    <div className='search-container'>
                        <img src={searchIcon} alt="search" />
                        {/* //auto complete gm */}
                        <Autocomplete
                        onLoad={(autocomplete) => {
                            setAutocompleteInstance(autocomplete);
                        }}
                        onPlaceChanged={onPlaceSelected}
                    >
                              <input type="text" placeholder="Search for a location" />
                              </Autocomplete>

                    </div>
                    <div className='icongroup'>
                        <img src={notification} alt='notification'/>
                        <Avatar name={username} size="40" round={true} />
                    </div>
                </div>
                <div className='mid-div'>
                    <Link className='mid-div-link'>
                     <img src={backBtn} alt='back'/>
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
                  showUserLocation={true}
                 zoom={11.5} center={center} mapContainerStyle={{width:"100%",height:"100%",borderRadius:"0.6rem"}}
                 onDblClick={handleMapClick}
                >
                 {/* Marker for selected search location */}
                 {searchedLocation && (
                            <Marker position={searchedLocation} />
                        )}

                        {/* Marker for clicked location */}
                        {lat !== 0 && long !== 0 && (
                            <Marker position={{ lat, lng: long }} />
                        )}
                </GoogleMap>
               </div>
            </div>
            <button onClick={getUserLocation} className='location-btn'>
                <img src={LiveLocation} alt="location" />
            </button>
    </>
)}

            
        </div>
    );
}


export default UserHome;