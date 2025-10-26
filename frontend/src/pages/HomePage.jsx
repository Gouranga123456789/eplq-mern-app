import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import useAuth from '../hooks/useAuth'; 

const HomePage = () => {
  const { userInfo } = useAuth(); 

  const getStartedPath = () => {
    if (!userInfo) {
      return '/login'; // Not logged in, go to login
    }
    return userInfo.isAdmin ? '/admin' : '/dashboard';
  };

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>EPLQ: Secure Location Queries</h1>
          <p className="hero-subtitle">
            Your location data, encrypted and protected. Search for points of
            interest without ever revealing your position to the server.
          </p>
          
          <Link to={getStartedPath()} className="hero-cta-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>1. Encrypted Uploads</h3>
            <p>
              Admins upload Points of Interest. All sensitive data is
              encrypted at rest using strong AES encryption.
            </p>
          </div>
          <div className="feature-card">
            <h3>2. Geospatial Search</h3>
            <p>
              Our backend uses efficient geospatial queries to find matches
              near you, powered by MongoDB's native 2dsphere indexing.
            </p>
          </div>
          <div className="feature-card">
            <h3>3. Private Decryption</h3>
            <p>
              The server sends you matching data, which is decrypted
              securely on the server-side, protecting your privacy.
            </p> {/* <-- THIS WAS THE FIX (was </E>) */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;