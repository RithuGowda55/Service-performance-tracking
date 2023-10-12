// index.js
//  import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import pdfjs from 'pdfjs-dist'; // Import pdfjs
// // Import required PDF.js modules
// import { GlobalWorkerOptions, PDFWorker } from 'pdfjs-dist';

// // Set the workerSrc property to the URL of the worker script
// GlobalWorkerOptions.workerSrc = 'path/to/pdf.worker.js'; // Replace with the correct path


// const pdfWorker = new PDFWorker();
// pdfWorker.postMessage({ pdfjs: 'init' });

// pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App'; // Import your main App component
// import { GlobalWorkerOptions, PDFWorker } from 'pdfjs-dist';

// // Set the workerSrc property to the URL of the worker script
// GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`; // Use PUBLIC_URL

// // Initialize PDF.js worker

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { createRoot } from 'react-dom/client'; // Use createRoot from 'react-dom'

// Set the workerSrc property to the URL of the worker script
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

// Initialize PDF.js worker

const root = createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


