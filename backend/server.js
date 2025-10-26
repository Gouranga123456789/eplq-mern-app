const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow us to accept JSON data

// Define Routes
app.get('/', (req, res) => res.send('EPLQ API Running'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pois', require('./routes/poi.routes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));