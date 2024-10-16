// LiveLocation.js
import React, { useEffect, useState } from 'react';

const LiveLocation = ({ userId }) => {
  const [socket, setSocket] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.users) {
        setOtherUsers(data.users); // Update other users' locations
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, [userId]);

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
    const intervalId = setInterval(sendLocation, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [socket]);

  return (
    <div>
      <h3>Other User&#39;s Live Locations</h3>
      <ul>
        {otherUsers.map((user) => (
          <li key={user.user_id}>
            User {user.user_id}: ({user.lat.toFixed(5)}, {user.lon.toFixed(5)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveLocation;
