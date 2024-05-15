import CircularJSON from 'circular-json';
import easyinvoice from 'easyinvoice';
import { userDetails } from '../mongodb/models/schema.js';
import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to receive invoice data from API
export const takeInvoiceData = async (req, res) => {
  try {
    const { address, city, state, postalZip } = req.body;

    // Get the count of documents in the userDetails collection
    const myCount = await userDetails.countDocuments({});

    // Prepare the invoice data
    const invoiceData = {
      company: {
        address,
        city,
        state,
        country: 'India',
        postalZip,
        logo: 'path/to/your/company/logo.png', // Optional: Path to your logo image
      },
      client: {
        name: 'Techorzo Minds',
        address: 'Arekere',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        postalZip: '560076',
      },
      information: {
        number: `${myCount + 1}+TRITONFITNESSSTUDIO`, // Replace with a unique invoice number
        date: new Date(), // Use the current date
        description: 'Invoice Description', // Add a brief description
      },
      items: [
        {
          quantity: 1,
          description: 'Item 1 Description',
          price: 100.00, // Use appropriate price format and decimals
          tax: 'Tax Name (e.g., VAT, GST)', // Optional tax name
          taxRate: 20, // Optional tax rate (percentage)
        },
        // Add more items as needed
      ],
      settings: {
        currency: 'USD', // Use the appropriate currency code
        tax: 'Include', // Options: 'Include' or 'Exclude'
        terms: 'Net 30 Days', // Add your payment terms
      },
      customize: {
        margins: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
    };

    // Return the received invoice data
    return invoiceData;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Function to generate and handle the invoice
export const generateInvoice = async (req, res) => {
  try {
    // Call the function to receive invoice data
    const invoiceData = await takeInvoiceData(req, res);

    const result = await easyinvoice.createInvoice(invoiceData); // Await the promise

    console.log(result); // Check the result object

    if (result && result.pdf) {
      console.log('Invoice generated successfully!');
      // Use the generated PDF data (result.pdf) for further processing
      // e.g., download, send to client, store in database

      // Example: Download the invoice
      const filePath = resolve(__dirname, 'invoice.pdf');
      await writeFile(filePath, result.pdf); // Use await with writeFile
      return { success: true, filePath };
    } else {
      console.error('Error generating invoice:', result ? result.error : 'Unknown error');
      return { success: false, error: result ? result.error : 'Unknown error' };
      // Handle errors appropriately (e.g., log, send error response)
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
    return { success: false, error: err.message };
    // Handle unexpected errors gracefully
  }
};

// Call the function to generate the invoice
export const createInvoice = async (req, res) => {
  try {
    const { success, filePath, error } = await generateInvoice(req, res);
    if (success) {
      res.download(filePath); // Download the generated PDF
    } else {
      res.status(500).json(CircularJSON.stringify({ error }));
    }
  } catch (err) {
    res.status(500).json(CircularJSON.stringify({ err: err.message }));
  }
};
