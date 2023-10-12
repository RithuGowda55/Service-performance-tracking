// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import React from 'react';
import ShipmentTracker from './components/ShipmentTracker';
import ShipmentDetailsPage from './components/ShipmentDetailsPage';
// import ContactPage from './ContactPage';



function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<ShipmentTracker />} /> {/* Use "element" */}
            <Route path="/shipment-details/:shipmentId" element={<ShipmentDetailsPage />} /> {/* Use "element" */}
            {/* <Route path="/contact" element={<ContactPage />} /> */}

          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;


