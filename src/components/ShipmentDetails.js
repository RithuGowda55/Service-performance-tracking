import React, { useState } from 'react';
import './form.css';
import axios from 'axios';
import { Document, Page } from 'react-pdf'; // Import react-pdf

function ShipmentDetails({ shipment }) {
  const [pdfURL, setPdfURL] = useState(null);

  const handleDownloadInvoice = async () => {
    console.log('Sending request to download invoice...');
    console.log('Shipment ID:', shipment.shipmentId);

    try {
      // Make a GET request to download the invoice for the specific shipment ID
      const response = await axios.get(`http://localhost:5002/api/shipment/${shipment.shipmentId}/invoice`, {
      responseType: 'blob', // Response type should be 'blob' for binary data
      });

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(response.data)
      console.log('PDF URL:', url);
      // Set the PDF URL state
      setPdfURL(url);
      // console.log(pdfURL);
      // setPdfURL(url); // Setting the PDF URL
      // console.log(pdfURL); // Debugging line

      // Create an <a> element and trigger a click to initiate download (optional)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${shipment.shipmentId}.pdf`);
      link.style.display = 'none'; // Hide the link
      document.body.appendChild(link);
      link.click();

      // Clean up (optional)
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link); // Remove the link from the document (optional)
    } catch (error) {
      console.error(error);
      // Handle any errors that might occur during download
      // console.error('Error downloading invoice:', error);
      alert('Error downloading invoice. Please try again later.');
      console.error(error);
    }
  };

  console.log(pdfURL);
  // setPdfURL(url); // Setting the PDF URL
  // console.log(pdfURL); // Debugging line

  return (
    <div className="shipment-details">
      <h2>Shipment Details:</h2>
      <div className="receipt">
        <div className="receipt-item">
          <span className="item-label">Vehicle Number:</span>
          <span className="item-value">{shipment.vehicleNumber}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Invoice Number:</span>
          <span className="item-value">{shipment.invoiceNumber}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">LR Number:</span>
          <span className="item-value">{shipment.lrNumber}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Vehicle Value:</span>
          <span className="item-value">{shipment.vehicleValue}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Transportation Charges:</span>
          <span className="item-value">{shipment.transportationCharges}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Agreement Date:</span>
          <span className="item-value">{shipment.agreementDate}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Agreement Time:</span>
          <span className="item-value">{shipment.agreementTime}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Delivery Deadline:</span>
          <span className="item-value">{shipment.deliveryDeadline}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Type of Goods:</span>
          <span className="item-value">{shipment.typeOfGoods}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Phone Number(+91 ):</span>
          <span className="item-value">{shipment.phoneNumber}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Emails:</span>
          <span className="item-value">{shipment.emails}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Delivery Address:</span>
          <span className="item-value">{shipment.deliveryAddress}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Address:</span>
          <span className="item-value">{shipment.address}</span>
        </div>
        <div className="receipt-item">
          <span className="item-label">Stockpile Metric Tons:</span>
          <span className="item-value">{shipment.stockpileMetricTons}</span>
        </div>

      </div>
      <button onClick={handleDownloadInvoice} className="download-button">Download Invoice</button>

      {/* Add the download link here */}
      {/* <a href={`http://localhost:5002/api/shipment/${shipment.shipmentId}/invoice`} download="invoice.pdf">
        Download Invoice
      </a> */}

      {/* Display the PDF */}
      <div>
        {pdfURL && (
          <Document file={pdfURL}>
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
    </div>
  );
}

export default ShipmentDetails;







