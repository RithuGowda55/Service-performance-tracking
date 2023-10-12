// works fine

const fs = require('fs');
const pdf = require('pdf-parse');

async function parsePdf() {
  try {
    // Read the PDF file
    // const dataBuffer = fs.readFileSync('D:/Downloads/motivation letter.pdf');
    const dataBuffer = fs.readFileSync('D:/Downloads/invoice_823745.pdf'); // Replace with your file path

    

    // Parse the PDF
    const data = await pdf(dataBuffer);

    // Get the number of pages
    const pageCount = data.numpages;
    console.log(`Number of pages: ${pageCount}`);

    // Extract text from each page
    for (let i = 0; i < pageCount; i++) {
      const text = data.text; // Extracted text from all pages
      
      console.log(`Contents of Page ${i + 1}:`);
      console.log(text);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

parsePdf();
