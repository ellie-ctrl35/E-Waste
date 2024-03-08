import {useEffect,useMemo,useState,useContext} from 'react';
import {useJsApiLoader,GoogleMap,Marker,Autocomplete} from '@react-google-maps/api';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Avatar from 'react-avatar';
import searchIcon from '../../resources/searchIcon.png';
import notification from '../../resources/notification.png';
import { AuthContext } from '../../Hooks/InfoContext';
import './User.css';

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
    const [airQualityData, setAirQualityData] = useState([]);
    const [type, setType] = useState('');
    const [long, setLong] = useState(0);     
    const [lat, setLat] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorldwideAirQualityData()
        console.log(airQualityData)
    }, []);

    const fetchWorldwideAirQualityData = async () => {
        const token = 'baeb66a7595a718c9712b72174a654b5891e92a4'; // Replace with your token
        const bounds = {
            latlng: '-35,37,-17,51' // Latitude and Longitude bounds for Africa
        };
        const apiUrl = `https://api.waqi.info/map/bounds?token=${token}&latlng=${bounds.latlng}`;
    
        
        axios.get(apiUrl)
        .then((res)=>{
            console.log(res);
            setAirQualityData(res);
        })
            
    };
    
    const WasteTypeModal = () => (
        <div className="modal">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleTypeSelect(e.target.type.value);
            }}>
                <label className='txt1' htmlFor="type">Select Waste Type:</label>
                <label className='txt2' htmlFor="type">Provide the category of waste by selecting from the dropdown</label>
                <select className='dropdown' name="type" id="type">
                    <option disabled selected hidden>Select Waste Type</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="Paper">Paper</option>
                </select>
                <button className='btn1' type="submit">Submit Response</button>
                <div>

                    <p style={{color:"green"}}>Try Ecohaul's AI waste segregation Tool</p>
                    <Link to="/aiPage">Click To Use</Link>
                </div>
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
    };

    const sendLocationData = () => {
        const data = {
            lat,
            long,
            type
        };

        axios.post('http://localhost:8080/api/request', data)
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
                <div className='buttonContainer'>
                  <div className='con1'>
                    <p style={{fontSize:'1.5rem',width:"70%",height:"40%",margin:"0",padding:"0",textAlign:"start",color:"black",fontWeight:500}}>Put in a Haul Request</p>
                    <button onClick={sendLocationData} className='btn3'>Make Request</button>
                  </div>
                  <button onClick={getUserLocation} className='btn2'>Use Live Location</button>
                </div>
              <div className='Mapbox'>
                <GoogleMap
                 options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                  }}
                  showUserLocation={true}
                  followUserLocation={true}
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
            {/*<button onClick={getUserLocation} className='location-btn'>
                <img src={LiveLocation} alt="location" />
            </button>*/}
    </>
)}          
        </div>
    );
}

export default UserHome;