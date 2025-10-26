import React from 'react';

const AboutPage = () => {
  return (
    <div className="container page-container">
      <h2>About Us</h2>
      <p>
        Welcome to EPLQ, your solution for Efficient Privacy-Preserving
        Location-Based Queries.
      </p>
      <p>
        Our mission is to provide a robust framework that allows users to query
        location-based services without compromising their privacy. In an era
        where data is a valuable commodity, we believe you should have control
        over your personal information.
      </p>
      <p>
        This project demonstrates a novel approach where sensitive data (like
        Point of Interest names) is encrypted before being stored. Searches are
        performed using secure, efficient geospatial indexing, and the results
        are decrypted only on the server, never exposing your private data or
        search queries to insecure third parties.
      </p>
    </div>
  );
};

export default AboutPage;