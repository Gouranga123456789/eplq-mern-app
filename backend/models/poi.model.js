const mongoose = require('mongoose');

const PoiSchema = new mongoose.Schema({
  // We store the sensitive name encrypted
  encryptedName: {
    type: String,
    required: true,
  },
  // We store the location in MongoDB's native GeoJSON format
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create the 2dsphere index for efficient geospatial queries
PoiSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('POI', PoiSchema);