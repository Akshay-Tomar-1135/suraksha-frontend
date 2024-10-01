import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

function RenderMap3() {
  const position = {lat: 53.54992, lng: 10.00678};

  return (
    <APIProvider apiKey='AIzaSyAbAOxjpIBjb-mcOudJ7_6A6-Rxm2s5TDI'>
      <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default RenderMap3;


// render map 1 fucntion testing
// --------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import {
//   GoogleMap,
//   Marker,
//   DirectionsService,
//   DirectionsRenderer,
//   useLoadScript,
// } from '@react-google-maps/api';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
// import { FaWalking, FaCar } from "react-icons/fa";
// import axios from 'axios'; // Import Axios

// const mapStyles = {
//   width: '100%',
//   height: '80vh',
// };

// const mapContainerStyle = {
//   height: '100%',
//   width: '100%',
// };

// const travelModes = {
//   driving: { icon: FaCar, color: "blue" },
//   walking: { icon: FaWalking, color: "green" },
// };

// const RenderMap = () => {
//   const [center, setCenter] = useState({
//     latitude: 36.7749,
//     longitude: -120.4194, 
//   });
//   const [source, setSource] = useState({ lat: 19.0863, lng: 72.8778 }); // Initial Source
//   const [destination, setDestination] = useState({ lat: 19.0760, lng: 72.8777 }); // Initial Destination
//   const [travelType, setTravelType] = useState("DRIVING");
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [routes, setRoutes] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
//   const [sourcePlace, setSourcePlace] = useState(""); // State for source place name
//   const [destinationPlace, setDestinationPlace] = useState(""); // State for destination place name

//   const handleTravelTypeChange = (type) => setTravelType(type.toUpperCase());

//   const handleSourceChange = (e) => {
//     setSourcePlace(e.target.value); // Update place name
//   };
  
//   const handleDestinationChange = (e) => {
//     setDestinationPlace(e.target.value); // Update place name
//   };

//   const clearSourceInput = () => {
//     setSource({ lat: null, lng: null });
//     setSourcePlace(""); // Clear place name
//   };
  
//   const clearDestInput = () => {
//     setDestination({ lat: null, lng: null });
//     setDestinationPlace(""); // Clear place name
//   };

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'YOUR_API_KEY', // Replace with your API key
//   });

//   const fetchLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCenter({latitude, longitude});
//           setLocation({ latitude, longitude });
//         },
//         (err) => {
//           setError(err.message);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   };

//   // Fetch location every 3 seconds
//   useEffect(() => {
//     const intervalId = setInterval(fetchLocation, 3000);
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (directionsResponse) {
//       setRoutes(directionsResponse.routes);
//     }
//   }, [directionsResponse]);

//   const handleDirectionsCallback = (response, status) => {
//     if (status === 'OK' && response) {
//       console.log('Directions Response:', response);
//       setDirectionsResponse(response);
//     } else {
//       console.error('Error fetching directions:', status);
//     }
//   };

//   const getCoordinates = async (place, isSource) => {
//     if (!place) return;
  
//     try {
//       const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
//         params: {
//           address: place,
//           key: 'YOUR_API_KEY', // Replace with your API key
//         },
//       });
      
//       if (response.data.results.length > 0) {
//         const { lat, lng } = response.data.results[0].geometry.location;
//         if (isSource) {
//           setSource({ lat, lng });
//           setCenter({ lat, lng }); // Optionally center the map on the source
//         } else {
//           setDestination({ lat, lng });
//         }
//       } else {
//         setError('No results found for the specified place.');
//       }
//     } catch (fetchError) { // Changed from error to fetchError
//       console.error('Error fetching coordinates:', fetchError);
//       setError('Failed to fetch coordinates. Please try again.');
//     }
//   };
  

//   const handleSourceFetch = () => {
//     getCoordinates(sourcePlace, true); // Fetch coordinates for source
//   };

//   const handleDestinationFetch = () => {
//     getCoordinates(destinationPlace, false); // Fetch coordinates for destination
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <>
//       <div className="box" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//         <div className="input-container" style={{ display: 'flex', justifyContent: 'space-between', width: '92%' }}>
//           <div className="field" style={{ flex: 1, marginRight: '10px' }}>
//             <TextField
//               label="Source (Place Name)"
//               variant="outlined"
//               value={sourcePlace}
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
//            <button type="button" onClick={handleSourceFetch}>Get Coordinates</button>
//           </div>

//           <div className="field" style={{ flex: 1, marginRight: '20px' }}>
//             <TextField
//               label="Destination (Place Name)"
//               variant="outlined"
//               value={destinationPlace}
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
//            <button type="button" onClick={handleDestinationFetch}>Get Coordinates</button>
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
//                     backgroundColor: travelType === mode.toUpperCase() ? travelModes[mode].color : "gray",
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

//       <div style={mapStyles}>
//         <GoogleMap
//           mapContainerStyle={mapContainerStyle}
//           zoom={3}
//           center={source || center}
//           options={{
//             gestureHandling: 'greedy',
//             zoomControl: true,
//           }}
//         >
//           {location.latitude !== null && location.longitude !== null && (
//             <Marker
//               position={{ lat: location.latitude, lng: location.longitude }}
//               label="You are here!"
//             />
//           )}
//           <Marker position={source} label="S" />
//           <Marker position={destination} label="D" />

//           {source && destination && isLoaded && (
//             <DirectionsService
//               options={{
//                 origin: source,
//                 destination, 
//                 travelMode: window.google.maps.TravelMode[travelType], 
//                 provideRouteAlternatives: true,
//               }}
//               callback={handleDirectionsCallback}
//             />
//           )}

//           {directionsResponse && (
//             <DirectionsRenderer
//               directions={directionsResponse}
//               routeIndex={selectedRouteIndex}
//               preserveViewport={false}
//             />
//           )}

//           {routes.length > 0 && (
//             <div className="route-selection">
//               <h2>Available Routes:</h2>
//               <ul>
//                 {routes.map((route, index) => (
//                   <li key={index}>
//                     <button
//                       type="button"
//                       onClick={() => setSelectedRouteIndex(index)}
//                     >
//                       {route.summary}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </GoogleMap>
//       </div>
//     </>
//   );
// };

// export default RenderMap;




