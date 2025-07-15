// LiveLocation.js
import React, { useEffect, useState } from 'react';
import { usePoliceLocation } from 'src/contexts/PoliceLocationContext';

const LiveLocation = ({ userId }) => {
  const [socket, setSocket] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const { setPoliceLocations, policeLocations } = usePoliceLocation();

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      if (data.users) {
        console.log('Other users data received:', data.users);
        setOtherUsers(data.users); // Update other users' locations
      }
      if (data.nearest_police_location && data.nearest_police_location.locations) {
        console.log('Police locations received:', data.nearest_police_location.locations);
        setPoliceLocations(data.nearest_police_location.locations);
      }
    };

    // ws.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };

    setSocket(ws);

    // Cleanup on unmount
    return () => {
      // ws.close();
    };
  }, [userId, setPoliceLocations]);

  useEffect(() => {
    if (!socket) return;

    const sendLocation = () => {
      // Get user's live location using Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          // Send location to backend
          socket.send(JSON.stringify(location));
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    };

    // Send location every 5 seconds
    const intervalId = setInterval(sendLocation, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [socket]);

  return (
    <div>
      <h3>Nearest Police Locations</h3>
      <ul>
        {policeLocations.map((police) => (
          <li key={police.police_id}>
            <strong>{police.name}</strong>: ({police.latitude.toFixed(5)}, {police.longitude.toFixed(5)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveLocation;
