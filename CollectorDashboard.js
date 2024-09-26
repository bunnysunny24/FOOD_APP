import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix for missing marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CollectorDashboard = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Fetch providers data from API
    // This is a mock implementation
    setProviders([
      { id: 1, name: 'Restaurant A', lat: 51.505, lng: -0.09, availableFood: ['Pizza', 'Pasta'], leftoverFood: 3 },
      { id: 2, name: 'Cafe B', lat: 51.51, lng: -0.1, availableFood: ['Sandwiches', 'Salads'], leftoverFood: 5 },
    ]);
  }, []);

  const handleMarkerClick = (provider) => {
    setSelectedProvider(provider);
  };

  const handleRequestFood = () => {
    // Here we would normally send a request to the server
    console.log('Food requested from:', selectedProvider.name);
    
    // Notify the collector that the request was successful
    setNotification(`Food requested from: ${selectedProvider.name}.`);
    
    // Optionally, you can alert the user as well
    alert(`Food requested from: ${selectedProvider.name}`);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="collector-dashboard">
      <h2>Collector Dashboard</h2>
      <div className="map-container" style={{ height: '400px', width: '100%' }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {providers.map((provider) => (
            <Marker 
              key={provider.id} 
              position={[provider.lat, provider.lng]}
              eventHandlers={{ click: () => handleMarkerClick(provider) }}
            >
              <Popup>
                <div>
                  <strong>{provider.name}</strong><br />
                  Available Food: {provider.availableFood.join(', ')}<br />
                  Leftover Food: {provider.leftoverFood}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedProvider && (
        <div className="provider-info">
          <h3>{selectedProvider.name}</h3>
          <p>Available Food: {selectedProvider.availableFood.join(', ')}</p>
          <p>Leftover Food: {selectedProvider.leftoverFood}</p>
          <button onClick={handleRequestFood} disabled={selectedProvider.leftoverFood <= 0}>
            Request Food
          </button>
        </div>
      )}
      
      {notification && (
        <div className="notification-popup">
          <p>{notification}</p>
          <button onClick={handleCloseNotification}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CollectorDashboard;
