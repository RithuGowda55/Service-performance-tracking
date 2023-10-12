// searchShipment.js

const Shipment = require('./models/Shipment'); // Assuming you have a Shipment model

async function findShipmentById(shipmentId) {
  try {
    const shipment = await Shipment.findOne({ shipmentId: shipmentId }).exec();
    return shipment;
  } catch (error) {
    console.error(error);
    throw new Error('Error searching for shipment');
  }
}

module.exports = {
  findShipmentById,
};
