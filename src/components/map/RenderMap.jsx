// import React, { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import { FaWalking, FaCar } from "react-icons/fa";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';

// mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkYXNoLWl2bXMiLCJhIjoiY2s5MmFoaXZkMDJqaTN0b3R0MXp2ZW9vaCJ9.vHhKgvClj48SJpFwjSdgug';

// function RenderMap() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [travelType, setTravelType] = useState("driving");
//   const mapRef = useRef(null); 
//   const markerRef = useRef(null); 

//   const travelModes = {
//     walking: { icon: FaWalking, color: "#4CAF50", profile: "walking" },
//     driving: { icon: FaCar, color: "#FF9800", profile: "driving" },
//   };

//   // Initialize map only once
//   // useEffect(() => {
//   //   if (mapRef.current) return;

//   //   const mapInstance = new mapboxgl.Map({
//   //     container: "central-map",
//   //     style: "mapbox://styles/mapbox/streets-v11", 
//   //     center: [77.5353394, 16.03106], 
//   //     zoom: 5,
//   //   });

//   //   mapRef.current = mapInstance;

//   //   const nav = new mapboxgl.NavigationControl();
//   //   mapInstance.addControl(nav, "top-left");

//   //   const directions = new MapboxDirections({
//   //     accessToken: mapboxgl.accessToken,
//   //     unit: "metric",
//   //     profile: `mapbox/${travelType}`, // Dynamic travel type
//   //     interactive: true,
//   //     alternatives: true,
//   //   });

//   //   mapInstance.addControl(directions, "top-right");

//   //   markerRef.current = new mapboxgl.Marker()
//   //     .setLngLat([77.5353394, 16.03106])
//   //     .addTo(mapInstance);

//   //   const waypoints = [
//   //     { coords: [72.83028, 18.93016], label: "Mumbai (Start)" },
//   //     { coords: [88.37124, 22.57054], label: "Kolkata (Midpoint)" },
//   //   ];

//   //   directions.setWaypoints(waypoints.map(wp => wp.coords));

//   //   mapInstance.on("load", () => {
//   //     directions.setWaypoints(waypoints.map(wp => wp.coords));
//   //   });

//   //   // return () => {
//   //   //   mapInstance.remove();
//   //   // };
//   // }, [travelType]);






//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkYXNoLWl2bXMiLCJhIjoiY2s5MmFoaXZkMDJqaTN0b3R0MXp2ZW9vaCJ9.vHhKgvClj48SJpFwjSdgug'
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       center: center,
//       zoom: zoom
//     });

//     mapRef.current.on('move', () => {
//       // get the current center coordinates and zoom level from the map
//       const mapCenter = mapRef.current.getCenter()
//       const mapZoom = mapRef.current.getZoom()

//       // update state
//       setCenter([ mapCenter.lng, mapCenter.lat ])
//       setZoom(mapZoom)
//     })

//     return () => {
//       mapRef.current.remove()
//     }
//   }, [])






//   const handleTravelTypeChange = (type) => {
//     setTravelType(type);
//   };

//   const handleSourceChange = (e) => {
//     setSource(e.target.value);
//   };

//   const handleDestinationChange = (e) => {
//     setDestination(e.target.value);
//   };

//   const clearSourceInput = () => {
//     setSource("");
//   };

//   const clearDestInput = () => {
//     setDestination("");
//   };

//   return (
//     <>
//       <div className="box" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//         <div className="input-container" style={{ display: 'flex', justifyContent: 'space-between', width: '92%' }}>
//           <div className="field" style={{ flex: 1, marginRight: '10px' }}>
//             <TextField
//               label="Source (lng, lat)"
//               variant="outlined"
//               value={source}
//               onChange={handleSourceChange}
//               fullWidth
//               InputProps={{
//                 endAdornment: (
//                   <IconButton onClick={clearSourceInput}>
//                     <ClearIcon />
//                   </IconButton>
//                 ),
//               }}
//             />
//           </div>

//           <div className="field" style={{ flex: 1, marginRight: '20px' }}>
//             <TextField
//               label="Destination (lng, lat)"
//               variant="outlined"
//               value={destination}
//               onChange={handleDestinationChange}
//               fullWidth
//               InputProps={{
//                 endAdornment: (
//                   <IconButton onClick={clearDestInput}>
//                     <ClearIcon />
//                   </IconButton>
//                 ),
//               }}
//             />
//           </div>

//           <div style={{ display: "flex", gap: "15px", alignItems: 'center' }}>
//             {Object.keys(travelModes).map((mode) => {
//               const Icon = travelModes[mode].icon;
//               return (
//                 <button
//                   key={mode}
//                   type="button"
//                   onClick={() => handleTravelTypeChange(mode)}
//                   style={{
//                     backgroundColor: travelType === mode ? travelModes[mode].color : "gray",
//                     color: "white",
//                     border: "none",
//                     padding: "10px",
//                     borderRadius: "50%",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <Icon />
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div
//         style={{
//           width: "65vw",
//           height: "68vh",
//           borderRadius: "10px",
//           overflow: "hidden",
//           border: '1px solid black'
//         }}
//         id="central-map"
//       />
//     </>
//   );
// }

// export default RenderMap;







import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '100%',
};

const RenderMap = (props) => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 37.7749, lng: -122.4194 }} // San Francisco Coordinates
      >
        <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AlzaSybYgTc-Rii_b6CLjj_EVv2XrjoZRtGzLpc', 
})(RenderMap);

