const router = require('express').Router();
const path = require('path');

// Define the base path for static files
const publicPath = path.join(__dirname, '../public');

/**
 * Middleware function to send requested HTML file as a response.
 * @param {string} fileName - Name of the HTML file (without extension).
 * @returns {function} - Express middleware function.
 */
const sendHtmlFile = (fileName) => (req, res) => {
  // Construct the full file path
  const filePath = path.join(publicPath, `${fileName}.html`);
  
  try {
    // Send the HTML file as a response
    res.sendFile(filePath);
  } catch (error) {
    // Handle errors if unable to send the file
    console.error(`Error sending file ${fileName}.html:`, error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Define routes

/**
 * GET route for the home page.
 * Sends 'index.html' as a response.
 */
router.get('/', sendHtmlFile('index'));

/**
 * GET route for the notes page.
 * Sends 'notes.html' as a response.
 */
router.get('/notes', sendHtmlFile('notes'));

// Export the router for use in other modules
module.exports = router;
