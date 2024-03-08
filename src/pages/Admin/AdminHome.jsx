import { useContext, useEffect, useMemo, useState } from "react";
import "../../App.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutIcon from '../../resources/LogOut.svg'
import Avatar from "react-avatar";
import notification from "../../resources/notification.png";
import backBtn from "../../resources/backIcon.png";
import { AuthContext } from "../../Hooks/InfoContext";

const center = {
  lat: 5.614818,
  lng: -0.205874,
};

const loaderOptions = {
  googleMapsApiKey: "AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4",
  libraries: ["places"], // Add 'places' if you need Autocomplete or other places library features
  version: "weekly",
  language: "en",
  region: "US",
};

function AdminHome() {
  const { logout, userInfo } = useContext(AuthContext);
  const [requests, setRequest] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const username = userInfo.username;
  const comAssociate = username;
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getRequests();
    getDriversCount();
  }, []);
  const getDriversCount = async () => {
    console.log(comAssociate);
    await axios
      .post("http://localhost:8080/api/drivers", { comAssociate })
      .then((res) => {
        console.log(res.data);
        setDrivers(res.data);
      });
  };

 const AssignDriver = ()=>{
  const driverId = document.getElementById("dropdownMenu").value;
  const requestId = selectedRequest._id;
  axios
    .post("http://localhost:5000/api/request/assigndriver", {
      driverId,
      requestId,
    })
    .then((response) => {
      console.log("Success:", response.data);
      getRequests();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  setSelectedRequest(null);
  getRequests();
 }

  const getRequests = () => {
    axios
      .get("http://localhost:8080/api/request/allrequests")
      .then((response) => {
        setRequest(response.data);
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { isLoaded } = useJsApiLoader(loaderOptions);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const infoWindowStyle = {
    width: "250px", // Set your desired width
    height: "200px", // Set your desired height
  
  };

  const handleMarkerClick = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <div className="AdminMapbox">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <div className="mapnav">

            <Link to="/admindriver" className="backBtn2">
              <img src={backBtn} alt="notification" />
            </Link>

            <input placeholder="Search location" className="location-search" />

            <div className="profile-left">
              <img src={notification} alt="notification" />
              <Avatar name={username} size="30" round={true} />
            </div>

          </div>

          <div
            style={{
              width: "3%",
              height: "6%",
              background: "#1C3530",
              position: "absolute",
              top: "80%",
              left: "2%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
            onClick={() => logout()}
          >
            <img src={LogoutIcon} className='logout' alt='logout'/>
          </div>
          {requests.map((request) => {
    const isPendingAndAvailable = request.status === "Pending" && request.TakenBy === "anyone";
    const markerIcon = isPendingAndAvailable 
        ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  // Red marker for available requests
        : "http://maps.google.com/mapfiles/ms/icons/green-dot.png";  // Green marker otherwise

    return (
        <Marker
            key={request._id}
            position={{ lat: request.lat, lng: request.long }}
            onClick={() => handleMarkerClick(request)}
            icon={markerIcon}
        />
    );
})}
          {selectedRequest && (
            <InfoWindow
              position={{ lat: selectedRequest.lat, lng: selectedRequest.long }}
              onCloseClick={() => setSelectedRequest(null)}
            >
              <div style={{ ...infoWindowStyle, background: "#D9D9D94D" }}>
                <h3 style={{textAlign:"center",color:"black",fontSize:"0.7rem"}}>Haul Details</h3>
                <h3 style={{ color: "black",fontSize:"0.7rem" }}>
                  Request From.........{selectedRequest.author}
                </h3>
                <p style={{ color: "black",textAlign:"center" }}>
                  Date Created: {selectedRequest.createdAt}
                </p>
                <p style={{ color: "black" }}>
                  Status: {selectedRequest.status}
                </p>
                <label htmlFor="dropdownMenu" style={{color:"black",fontWeight:500}}>Assign driver</label><br/>
                <select style={{border:"none",background:"white",outline:"none",width:"180px",height:"30px"}}  id="dropdownMenu" name="dropdown">
                <option value="" disabled selected>Select a driver...</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.username}{""}
                    </option>
                  ))}
                </select>
                <button onClick={AssignDriver} style={{width:"60%",height:"17%",fontSize:"0.6rem",marginRight:"50px"}}>Assign Haul</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default AdminHome;
