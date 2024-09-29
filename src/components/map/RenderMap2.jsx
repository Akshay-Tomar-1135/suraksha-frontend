/* global google */
import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

// Define your API key
const API_KEY = "AIzaSyAbAOxjpIBjb-mcOudJ7_6A6-Rxm2s5TDI";

// Main component to render the map and directions
const RenderMap2 = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      defaultCenter={{ lat: 43.65, lng: -79.38 }} // Center on Toronto
      defaultZoom={9} // Zoom level
      gestureHandling="greedy"
    //   disableDefaultUI
    >
      {/* <Directions /> Render Directions component inside the Map */}
    </Map>
  </APIProvider>
);

// Directions Component for route rendering
const Directions = () => {
  const map = useMap(); // Accessing the map instance
  const routesLibrary = useMapsLibrary('routes'); // Accessing the routes library
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
    renderer.setMap(null); // Initialize without rendering
  }, [routesLibrary, map]);

  // Request directions
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: '100 Front St, Toronto ON', // Origin point
        destination: '500 College St, Toronto ON', // Destination point
        travelMode: google.maps.TravelMode.DRIVING, // Mode of transport
        provideRouteAlternatives: true, // Provide alternate routes
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes); // Store routes
      })
      .catch((error) => {
        console.error("Error fetching directions:", error); // Log errors
      });
  }, [directionsService, directionsRenderer]);

  // Update the displayed route
  useEffect(() => {
    if (directionsRenderer) {
      directionsRenderer.setRouteIndex(routeIndex); // Change route based on selected index
    }
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null; // If no route is selected, return null

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button type="button" onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderMap2;
