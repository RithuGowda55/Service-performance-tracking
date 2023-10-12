// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const pdf = require('pdf-lib');
// const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const Shipment = require('./models/Shipment'); 
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');
// Create a Shipment model

const findShipmentById = require('./searchShipment');
// const searchShipment = require('./searchShipment'); // Adjust the path as needed


const app = express();

// Connect to MongoDB using your MongoDB Atlas connection string
const connectionString = 'mongodb+srv://druthigs2003:68KdK8ubdTu31uZl@cluster0.y8u9sgh.mongodb.net/data_base_a';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Parse JSON requests
app.use(bodyParser.json());

// Use CORS middleware to allow requests from all origins
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello, this is the root of the application!');
// });

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});


app.get('/', async (req, res) => {
  try {
      // Retrieve the shipment data from MongoDB. You can use Mongoose or a MongoDB client for this.
      // For example, using Mongoose:
      const shipments = await Shipment.find().exec();

      // Check if any shipments were found
      if (shipments.length === 0) {
          return res.status(404).json({ error: 'No shipments found' });
      }

      // Send the shipment data as JSON response to your React frontend
      res.json(shipments);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/shipment/:shipmentId', async (req, res) => {
    try {
      const shipment = await Shipment.findOne({ shipmentId: req.params.shipmentId });
      console.log(shipment.agreementTime);
  console.log(shipment);
      if (!shipment) {
        return res.status(404).json({ error: 'Shipment not found' });
      }
  
      res.json(shipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  
  app.get('/api/shipment/:shipmentId/invoice', async (req, res) => {
    const { shipmentId } = req.params;
  console.log(shipmentId);
    try {
      // Create a new PDF document
      // const pdfDoc = await PDFDocument.create();
  
      // Add a new page to the document
      // const page = pdfDoc.addPage([60, 40]);

  //          page.drawText('Hello, World!', {
  //       x: 50,
  //       y: 350,
  //       size: 30,
  //       color: rgb(0, 0, 0), // Black color
  //     });


// Create a new PDF document
// const doc = new PDFDocument();

// // Pipe the PDF to a file
// const writeStream = fs.createWriteStream('./example.pdf');
// doc.pipe(writeStream);


// // Add text to the PDF
// doc.fontSize(30).text('Hello, World!', 50, 350);

// // End the document
// doc.end();

// Close the write stream
// writeStream.on('finish', () => {
//   console.log('PDF created successfully.');
// });

// writeStream.on('error', (err) => {
//   console.error('Error creating PDF:', err);
// });
const shipment = await Shipment.findOne({shipmentId:shipmentId}).exec();
      
const doc = new PDFDocument();
const stream = new PassThrough();
// console.log(shipments.emails);
// const shipments = {
//   _id: "652692b5f7823ae456fc4b37",
//   shipmentId: 823745,
//   vehicleNumber: "KA 11 UV 3456",
//   invoiceNumber: "432",
//   vehicleValue: 710000,
//   transportationCharges: 25030,
//   lrNumber: "96382",
//   vehicle: "Tata Ace",
//   agreementDate: "14-09-2023",
//   agreementTime: "5:00 PM",
//   deliveryDeadline: "27-10-2023",
//   typeOfGoods: "Consumer Goods",
//   phoneNumber: -9876543119,
//   emails: "warehouse01@companyname.com",
//   deliveryAddress: "ABC Logistics Pvt. Ltd. 123, Industrial Area Mumbai, Maharashtra - 400001",
//   address: "Southern Cargo Handlers Pvt. Ltd. 123, Industrial Avenue Chennai, Tamil Nadu - 600001",
//   stockpileMetricTons: 15
// };
// Set the response headers for a PDF file
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', `attachment; filename="invoice_${shipmentId}.pdf"`);
doc.pipe(stream);
// Pipe the PDF to the response stream
doc.font('Helvetica-Bold').fontSize(18).text('Shipment Details', { align: 'center' });
doc.moveDown();


// for (const key in shipments) {
//   if (shipments.hasOwnProperty(key)) {
//     // doc.font('Helvetica').fontSize(12).text(`$isNew: ${data.$isNew}`);
//     doc.font('Helvetica').fontSize(12).text(`Some Property: ${data.$__.key}`);
// }
const shipmentobj=JSON.stringify(shipment);
const shipments=JSON.parse(shipmentobj);

doc.font('Helvetica').fontSize(12).text(`Shipment ID: ${shipments.shipmentId}`);
doc.font('Helvetica').fontSize(12).text(`Vehicle Number: ${shipments.vehicleNumber}`);
doc.font('Helvetica').fontSize(12).text(`Invoice number: ${shipments.invoiceNumber}`);
doc.font('Helvetica').fontSize(12).text(`Value of vehicle (in Rupees): ${shipments.vehicleValue}`);
doc.font('Helvetica').fontSize(12).text(`Transportation Cost: ${shipments.transportationCharges}`);
doc.font('Helvetica').fontSize(12).text(`Lort Receipt Number: ${shipments.lrNumber}`);
doc.font('Helvetica').fontSize(12).text(`Vehicle Name: ${shipments.vehicle}`);
doc.font('Helvetica').fontSize(12).text(`Agreement Date: ${shipments.agreementDate}`);
doc.font('Helvetica').fontSize(12).text(`Time of Agreement: ${shipments.agreementTime}`);
doc.font('Helvetica').fontSize(12).text(`Delivery Deadline: ${shipments.deliveryDeadline}`);
doc.font('Helvetica').fontSize(12).text(`Phone Number: ${shipments.phoneNumber}`);
doc.font('Helvetica').fontSize(12).text(`Types of goods shipped: ${shipments.typeOfGoods}`);
doc.font('Helvetica').fontSize(12).text(`Email: ${shipments.emails}`);
doc.font('Helvetica').fontSize(12).text(`Delivery Address: ${shipments.deliveryAddress}`);
doc.font('Helvetica').fontSize(12).text(`Address: ${shipments.address}`);
doc.font('Helvetica').fontSize(12).text(`Stockpile (Metric Tons): ${shipments.stockpileMetricTons}`);

// End the document
doc.end();

// Pipe the PDF content to the response
stream.pipe(res);

      // Serialize the PDF document to bytes
      // const pdfBytes = await pdfDoc.save();
  
      // Set headers for downloading
      // res.setHeader('Content-Disposition', `attachment; filename="invoice_${shipmentId}.pdf"`);
      // res.setHeader('Content-Type', 'application/pdf');
  
      // res.end(pdfBytes);
      // Send the PDF bytes as the response
      // console.log('hi');
      // res.sendFile(__dirname+'/example.pdf');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generating invoice.');
    }
  });
  
//   app.get('/api/shipment/:shipmentId/invoice', async (req, res) => {
//     const { shipmentId } = req.params;

//     try {
//         const shipment = await Shipment.findOne({ shipmentId: shipmentId });

//         if (!shipment) {
//             return res.status(404).json({ error: 'Shipment not found' });
//         }

//         // Create a new PDF document
//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage([600, 400]);
//         const { width, height } = page.getSize();

//         // Customize your invoice content here
//         const content = `Invoice for Shipment ID: ${shipmentId}\n\n`;
//         content += `Vehicle Number: ${shipment.vehicleNumber}\n`;
//         content += `Invoice Number: ${shipment.invoiceNumber}\n`;
//         // Add more content as needed

//         // Add the content to the PDF page
//         const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
//         page.drawText(content, {
//             x: 50,
//             y: height - 50,
//             size: 12,
//             font: helveticaFont,
//             color: rgb(0, 0, 0),
//         });

//         const pdfBytes = await pdfDoc.save();

//         // Set headers for downloading
//         res.setHeader('Content-Disposition', `attachment; filename="invoice_${shipmentId}.pdf`);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBytes);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error generating invoice.');
//     }
// });



  
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
