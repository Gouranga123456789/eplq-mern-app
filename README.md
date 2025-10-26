<h2>EPLQ: Efficient Privacy-Preserving Location-Based Query</h2>
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
<h4>Technologies Used</h4>

  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Technology</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Frontend</td>
        <td>React.js (with Vite), React Router, Leaflet.js, Axios</td>
      </tr>
      <tr>
        <td>Backend</td>
        <td>Node.js, Express.js</td>
      </tr>
      <tr>
        <td>Database</td>
        <td>MongoDB (with MongoDB Atlas)</td>
      </tr>
      <tr>
        <td>Authentication</td>
        <td>JSON Web Tokens (JWT), bcrypt.js</td>
      </tr>
      <tr>
        <td>Encryption</td>
        <td>crypto-js (AES)</td>
      </tr>
      <tr>
        <td>ODM</td>
        <td>mongoose</td>
      </tr>
    </tbody>
  </table>
<h4></h4>Workflow: How It Works</h4>
<p>The core privacy-preserving workflow is as follows:</p>
<ol>
<li>Admin Uploads: An Admin logs in and navigates to the Admin Dashboard. They fill out a form with "City Hospital", its latitude, and its longitude.
</li>
<li>Server Encrypts: The backend Express server receives this data.
<ul>
<li>It encrypts the sensitive name: "City Hospital" becomes "U2FsdG...=".</li>

<li>It stores the encrypted name and a native GeoJSON Point in the MongoDB pois collection.</li> </ul>
</li>
<li>User Searches: A User logs in and goes to their dashboard. They click on the map or enter coordinates to search.
</li>
<li>Server Queries & Decrypts: The backend receives the user's coordinates and radius.
<ul>
<li>It performs a geospatial query ($near) to find all documents within that radius.</li>

<li>It decrypts the encryptedName for each matching document.</li>

<li>It sends the plain text (decrypted) results back to the user's browser.</li> </ul>
</ol>

<p>Privacy is preserved because the sensitive data is never stored in plain text, and the search logic is handled entirely on the server.</p>
