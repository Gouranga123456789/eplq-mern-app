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

const AdminDashboard = () => {
  const [markerPosition, setMarkerPosition] = useState([defaultCenter.lat, defaultCenter.lng]);
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(defaultCenter.lat);
  const [longitude, setLongitude] = useState(defaultCenter.lng);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await poiService.upload(name, latitude, longitude);
      setMessage('POI uploaded successfully!');
      setName('');
    } catch (err){
      setError(err.response?.data?.msg || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      
      {/* UPDATED LAYOUT */}
      <div className="dashboard-layout">
        
        {/* Column 1: Main (Form) */}
        <div className="dashboard-main">
          <div className="dashboard-form-card">
            <h3>Upload New POI</h3>
            <form onSubmit={handleSubmit} className="auth-form" style={{marginTop: '1.5rem'}}>
              <input
                type="text"
                placeholder="POI Name (e.g., City Hospital)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Latitude"
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
                placeholder="Longitude"
                step="any"
                value={longitude}
                onChange={(e) => {
                  const newLng = parseFloat(e.target.value) || 0;
                  setLongitude(newLng);
                  setMarkerPosition([latitude, newLng]);
                }}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? <div className="loader"></div> : 'Upload Encrypted POI'}
              </button>

              {message && <p className="success-msg">{message}</p>}
              {error && <p className="error-msg">{error}</p>}
            </form>
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
export default AdminDashboard;