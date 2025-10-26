<h3>EPLQ: Efficient Privacy-Preserving Location-Based Query</h3>
<p>
  This project is a full-stack MERN application that implements the "EPLQ" concept, a solution for Efficient Privacy-Preserving Location-Based Queries. </p>

<p>It addresses the privacy concerns of Location-Based Services (LBS)  by allowing users to find Points of Interest (POIs) without revealing their personal location data. All sensitive POI information is encrypted on the server, and queries are handled using secure, server-side geospatial logic.
</p>
<h4>Key Features</h4>
<ul>
  <li><b>Admin Dashboard:</b> Secure, role-protected panel for uploading new POI data.</li>
  <li><b>User Dashboard:</b> An interactive dashboard for users to search for POIs within a specified radius.</li>
  <li><b>Server-Side Encryption:</b> POI names are encrypted with crypto-js (AES) before being stored, ensuring data privacy at rest.</li>
  <li><b>Geospatial Queries:</b> Uses MongoDB's native 2dsphere index to perform highly efficient $near queries.</li>
  <li><b>Interactive Map:</b> Features a Leaflet.js and OpenStreetMap interface (no API keys required) to visually select search locations.</li>
  <li><b>Role-Based Access:</b> Secure frontend and backend routes using JWT, differentiating between User and Admin roles.</li>
  <li><b>Fully Responsive:</b> A modern, mobile-first design with a hamburger menu for all devices. </li>
  
</ul>
