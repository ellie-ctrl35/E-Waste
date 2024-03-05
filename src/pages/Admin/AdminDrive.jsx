import {useState,useContext,useEffect,useMemo} from 'react'
import'./Driver.css'
import AdminNavbar from '../../components/AdminNavbar';
import notification from '../../resources/notification.png'
import Avatar from 'react-avatar'
import { AuthContext } from '../../Hooks/InfoContext';
import axios from 'axios';
import {useJsApiLoader,GoogleMap,Marker,Circle} from '@react-google-maps/api';

const center = {
  lat:   5.614818,
  lng: -0.205874
}

const loaderOptions = {
  googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4",
  libraries: ["places"], // Add 'places' if you need Autocomplete or other places library features
  version: "weekly",
  language: "en",
  region: "US",
};

const defaultRadius = 2000;

const AdminDrive = () => {
  const {register,userInfo}= useContext(AuthContext);
  const Username = userInfo.username;
  const role = "driver";
  const [email,setEmail]=useState("");
  const [username,setUsername]= useState('');
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState('');
  const [drivers,setDrivers]=useState([]); // Assuming drivers is an array of objects with a username field
  const comAssociate = Username;
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);

  const handlecircle = (e) =>{
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setlat(lat);
    setlong(lng);
    console.log(lat,lng)
  }


  const AddNewDriver = (e) =>{
    e.preventDefault()
    register(username, email, password, phone,role,comAssociate,lat,long);
    console.log(username, email, password, phone,role,comAssociate,lat,long)
    setEmail("");
    setUsername("");
    setPhone("");
    setPassword("");
    setlat(null);
    setlong(null);
  }
 
  useEffect(()=>{
    const getDriversCount = async () =>{
      console.log(comAssociate)
      await axios.post('http://localhost:5000/api/drivers',{comAssociate})
      .then((res)=>{
        console.log(res.data)
        setDrivers(res.data)
      })
    }

    getDriversCount();
  },[comAssociate])

const { isLoaded } = useJsApiLoader(loaderOptions);
    if (!isLoaded) {
        return <div>Loading...</div>
    }

  return (
    <div className='App'>
      <AdminNavbar/>
      <div className='right-side'>
        <div className='comNamediv'>
          <h1 className='comtxt'>{Username}</h1>
          <div className='profileContainer'>
            <img src={notification} alt='noti'/>
            <Avatar size={40} name={Username} round/>
          </div>
        </div>
      {/*<div className='bigdiv'>
        <div className='leftbigdiv'>
          <div className='countdiv'>
            <h1>{drivers.length}</h1>
          </div>
          <div className='driverstb'>
            <ul>
              {
                drivers.map((driver)=>{
                  return(
                    <li>{driver.username}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <form onSubmit={AddNewDriver}>
          <label className='labelS'>Add a driver to your company</label>
          <label className='labelH'>Name*</label>
          <input onChange={(e)=>setUsername(e.target.value)} className='driverInput' type="text" />
          <label className='labelH'>Email*</label>
          <input onChange={(e)=>setEmail(e.target.value)} className='driverInput' type="text" />
          <label className='labelH'>Phone Number*</label>
          <input onChange={(e)=>setPhone(e.target.value)} className='driverInput' type="text" />
          <label className='labelH'>Assigned Password*</label>
          <input onChange={(e)=>setPassword(e.target.value)} className='driverInput' type="text" />
          <button style={{}} className='driverBtn'>Next</button>
        </form>
      </div>
      */}
    </div>
      <div style={{position:'absolute',background:'yellow',height:'81vh',width:'50vw',left:"22%",top:"16%"}}>
        <GoogleMap onDblClick={handlecircle} zoom={10} center={center} mapContainerStyle={{width:"100%",height:"100%"}}
         options={{
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false,
          styles: [
              {
                  featureType: "poi", // Points of interest
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
              },
              // ... Add more feature types as needed
          ]
      }}
        >
        {lat !== 0 && long!==0 && (
            <>
              <Marker position={{lat,lng:long}} />
              <Circle
                center={{lat,lng:long}}
                radius={defaultRadius}
                options={{
                  fillColor: "dodgerblue",
                  fillOpacity: 0.3,
                  strokeColor: "#fff",
                  strokeOpacity: 0.2,
                  strokeWeight: 2,
                }}
              />
            </>
          )}
        </GoogleMap>
      </div>

      <form style={{position:"absolute",width:"27vw",height:'80vh',top:'18%',left:"72%",background:"dodgerblue"}} onSubmit={AddNewDriver}>
          <label className='labelS'>Add a driver to your company</label>
          <label className='labelH'>Name*</label>
          <input onChange={(e)=>setUsername(e.target.value)} className='driverInput' type="text" />
          <label className='labelH'>Email*</label>
          <input onChange={(e)=>setEmail(e.target.value)} className='driverInput' type="text" />
          <label className='labelH'>Phone Number*</label>
          <input onChange={(e)=>setPhone(e.target.value)} className='driverInput' type="text" />
          <label className='labelH'>Assigned Password*</label>
          <input onChange={(e)=>setPassword(e.target.value)} className='driverInput' type="text" />
          <button style={{}} className='driverBtn'>Next</button>
        </form>
    </div>
  )
}

export default AdminDrive;

