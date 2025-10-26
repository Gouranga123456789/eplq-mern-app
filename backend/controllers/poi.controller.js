const POI = require('../models/poi.model.js');
const crypto = require('crypto-js');
require('dotenv').config();

const SECRET_KEY = process.env.ENCRYPTION_KEY;

// Helper function for encryption
const encrypt = (text) => {
  return crypto.AES.encrypt(text, SECRET_KEY).toString();
};

// Helper function for decryption
const decrypt = (ciphertext) => {
  const bytes = crypto.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(crypto.enc.Utf8);
};

// @desc    Upload a new POI
// @route   POST /api/pois/upload
// @access  Private/Admin
exports.uploadPOI = async (req, res) => {
  const { name, latitude, longitude } = req.body;

  try {
    // 1. Encrypt the sensitive data
    const encryptedName = encrypt(name);

    // 2. Create the GeoJSON object
    const location = {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)], // [lon, lat]
    };

    const newPOI = new POI({
      encryptedName,
      location,
      uploadedBy: req.user._id,
    });

    const poi = await newPOI.save();
    console.log(`POI Uploaded: ${name} (ID: ${poi._id}) by ${req.user.email}`);
    res.status(201).json(poi);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Server Error');
  }
};

// @desc    Search for POIs
// @route   POST /api/pois/search
// @access  Private
exports.searchPOIs = async (req, res) => {
  const { latitude, longitude, radius } = req.body; // radius in km

  // Convert radius to meters for MongoDB
  const radiusInMeters = parseFloat(radius) * 1000;

  try {
    // 1. Find POIs using MongoDB's geospatial query
    const pois = await POI.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: radiusInMeters,
        },
      },
    });
    
    console.log(`Search at [${latitude}, ${longitude}] found ${pois.length} results`);

    // 2. Decrypt the sensitive data before sending to client
    const decryptedPOIs = pois.map((poi) => {
      try {
        const decryptedName = decrypt(poi.encryptedName);
        return {
          id: poi._id,
          name: decryptedName,
          location: poi.location.coordinates, // [lon, lat]
        };
      } catch (e) {
        console.error(`Failed to decrypt POI ${poi._id}`, e);
        return {
          id: poi._id,
          name: '[Decryption Error]',
          location: poi.location.coordinates,
        };
      }
    });

    res.json(decryptedPOIs);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send('Server Error');
  }
};