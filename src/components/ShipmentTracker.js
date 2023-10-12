// src/components/ShipmentTracker.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
// import { Link } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import ShipmentDetails from './ShipmentDetails';






function ShipmentTracker() {
    const [shipmentId, setShipmentId] = useState('');
    const [shipmentData, setShipmentData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiUrl = 'http://localhost:5002/api/shipment/';
    // const history = useHistory();



    const handleEnterKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                setLoading(true); // Set loading to true
                setError(''); // Clear any previous errors
                const response = await axios.get(`http://localhost:5002/api/shipment/${shipmentId}`);
                setShipmentData(response.data);
            } catch (error) {
                setError('Shipment not found'); // Display an error message
                console.error(error);
                setShipmentData(null);
            } finally {
                setLoading(false); // Set loading back to false after the request is complete
            }
        }
    };


    return (


        <div>
            <nav id="navbar">
                <ul id="list">
                    <li id="logo"></li>
                    <li><a href="/" id="list1">Home</a></li>
                    <li><a href="/" id="list1">About</a></li>
                    <li><a href="/" id="list1">Services</a></li>
                    <li className="contactus">
                        <a href="/" id="list1" >
                            ContactUs
                        </a>

                    </li>                    <li className="search">
                        <div id="s">
                            <input
                                type="text"
                                name="ss"
                                placeholder="Enter Shipment ID"
                                id="btn"
                                value={shipmentId}
                                onChange={(e) => setShipmentId(e.target.value)}
                                onKeyPress={handleEnterKeyPress}
                            />
                            {loading ? (
                                // Loading indicator
                                <p></p>
                            ) : (
                                shipmentData ? (
                                    // Display shipment details with a link to the details page
                                    <div>
                                        <h2 id="headers">Shipment Details:</h2>
                                        {/* <p>Vehicle Number: {shipmentData.vehicleNumber}</p> */}
                                        {/* Other shipment details */}
                                        <Link to={`/shipment-details/${shipmentData.shipmentId}`}>View Details</Link>
                                    </div>
                                ) : (
                                    <p>Shipment not found if link does not appear</p>
                                )
                            )}
                            <div className="search-button">
                                <i className="bi bi-search">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="21"
                                        fill="currentColor"
                                        className="bi bi-search"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </i>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            <h1 id="header">Welcome To Transportation Logistics</h1>
            <div className="background">
                <div className="cont1">
                    <div class="subcont1">
                        <div id="about">
                            <div id="sub1">Welcome to Manjunath Cargo Movers </div>
                            Logistics and supply chain arm offering seamless end-to-end fulfilment services for businesses. We
                            aim to provide superior customer experience and hassle-free logistics.
                        </div>
                        <button id="btn1">Know more</button>
                    </div>
                    <div class="subcont2">
                        {/* <input type="text" name="ss" placeholder="TRACK YOUR SHIPMENT" id="btn"> */}
                    </div>
                </div>
                <footer className="foot">
                    <div className="cc">
                        <h1 id="header2">Cargo Movers</h1>
                        <div className="end">
                            <nav>
                                <ul id="list">
                                    <li id="list1">About tourism</li>
                                    <li id="list1" >Contact us</li>
                                    <li id="list1">Licensing Request</li>
                                    <li id="list1">Terms of Use</li>
                                    <li id="list1">Privacy Policy</li>
                                </ul>
                            </nav>
                        </div>
                        <div id="last">
                            © Address: No.2203/29, New Santhepet, Mysore, Mysore - 570001
                        </div>
                        <div id="z">A Channel by Transportation Logistics</div>
                        <div id="center">
                            <i className="bi bi-truck-front" style={{ color: "white" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="70"
                                    height="70"
                                    fill="currentColor"
                                    className="bi bi-truck-front"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7ZM4 2a1 1 0 0 0-1 1v3.9c0 .625.562 1.092 1.17.994C5.075 7.747 6.792 7.5 8 7.5c1.208 0 2.925.247 3.83.394A1.008 1.008 0 0 0 13 6.9V3a1 1 0 0 0-1-1H4Zm0 1h8v3.9c0 .002 0 .001 0 0l-.002.004a.013.013 0 0 1-.005.002h-.004C11.088 6.761 9.299 6.5 8 6.5s-3.088.26-3.99.406h-.003a.013.013 0 0 1-.005-.002L4 6.9c0 .001 0 .002 0 0V3Z" />
                                    <path d="M1 2.5A2.5 2.5 0 0 1 3.5 0h9A2.5 2.5 0 0 1 15 2.5v9c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.496 2.496 0 0 1-1-2v-9ZM3.5 1A1.5 1.5 0 0 0 2 2.5v9A1.5 1.5 0 0 0 12.5 1h-9Z" />
                                </svg>
                            </i>
                        </div>
                    </div>
                </footer>
            </div>

        </div>

    );
}

export default ShipmentTracker;
