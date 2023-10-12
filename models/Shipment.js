// models/Shipment.js
const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentId: Number,
  vehicleNumber: String,
  invoiceNumber: String,
  lrNumber: String,
  vehicleValue: Number,
  transportationCharges: Number,
});

module.exports = mongoose.model('Shipment', shipmentSchema);
