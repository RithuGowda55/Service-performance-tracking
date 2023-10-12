import React, { useEffect, useState } from 'react';
import ShipmentDetails from './ShipmentDetails';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShipmentDetailsPage() {
  const { shipmentId } = useParams();
  // console.log(id);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log('shipmentId:', shipmentId); // Add this line
    if (shipmentId) {
      axios
        .get(`http://localhost:5002/api/shipment/${shipmentId}`)
        .then((response) => {
          console.log('shipment:', response.data); // Add this line
          setShipment(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [shipmentId]);
  
  
  

  return (
    <div>
      <h1>Shipment Details Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        shipment ? (
          <ShipmentDetails shipment={shipment} />
        ) : (
          <p>No details found for this shipment.</p>
          
        )
      )}
    </div>
  );
}

export default ShipmentDetailsPage;



