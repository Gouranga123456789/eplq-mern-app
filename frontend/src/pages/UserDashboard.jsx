import React, { useState } from 'react';
import poiService from '../services/poi.service';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

const defaultCenter = { lat: 40.7128, lng: -74.0060 };

function MapClickHandler({ setLatitude, setLongitude, setMarkerPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatitude(lat);
      setLongitude(lng);
      setMarkerPosition([lat, lng]);
    },
  });
  return null;
}

const UserDashboard = () => {
  const [markerPosition, setMarkerPosition] = useState([defaultCenter.lat, defaultCenter.lng]);
  const [latitude, setLatitude] = useState(defaultCenter.lat);
  const [longitude, setLongitude] = useState(defaultCenter.lng);
  const [radius, setRadius] = useState(5);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('Perform a search to see results.');
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLatitude(newLat);
          setLongitude(newLng);
          setMarkerPosition([newLat, newLng]);
        },
        (err) => {
          setMessage(`Error getting location: ${err.message}`);
        }
      );
    } else {
      setMessage('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setMessage('');
    try {
      const data = await poiService.search(latitude, longitude, radius);
      if (data.length === 0) {
        setMessage('No results found.');
      } else {
        setResults(data);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Search failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container">
      <h2>User Dashboard</h2>
      

      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="dashboard-form-card">
            <h3>Search POIs</h3>
            <form onSubmit={handleSubmit} className="auth-form" style={{marginTop: '1.5rem'}}>
              <input
                type="number"
                placeholder="Your Latitude"
                step="any"
                value={latitude}
                onChange={(e) => {
                  const newLat = parseFloat(e.target.value) || 0;
                  setLatitude(newLat);
                  setMarkerPosition([newLat, longitude]);
                }}
                required
              />
              <input
                type="number"
                placeholder="Your Longitude"
                step="any"
                value={longitude}
                onChange={(e) => {
                  const newLng = parseFloat(e.target.value) || 0;
                  setLongitude(newLng);
                  setMarkerPosition([latitude, newLng]);
                }}
                required
              />
              <input
                type="number"
                placeholder="Radius (in km)"
                step="any"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={handleGetLocation}
              >
                Use My Current Location
              </button>
              <button type="submit" disabled={loading}>
                {loading ? <div className="loader"></div> : 'Search'}
              </button>
            </form>
          </div>

          
          <div className="results-container">
            <h3>Results (Decrypted by Server)</h3>
            {loading && <div className="page-loader"></div>}
            {!loading && message && <p>{message}</p>}
            {results.map((poi) => (
              <div key={poi.id} className="result-item">
                <strong>{poi.name}</strong>
                <br />
                <small>Coords: [{poi.location[1]}, {poi.location[0]}]</small>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container">
          <MapContainer 
            center={markerPosition} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerPosition} />
            <MapClickHandler 
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              setMarkerPosition={setMarkerPosition}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;