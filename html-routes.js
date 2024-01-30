const router = require('express').Router();
const path = require('path');

// Define path constants for better readability
const publicPath = path.join(__dirname, '../public');

// Route that sends requested HTML file as a response
const sendHtmlFile = (fileName) => (req, res) => {
  const filePath = path.join(publicPath, `${fileName}.html`);
  try {
    res.sendFile(filePath);
  } catch (error) {
    console.error(`Error sending file ${fileName}.html:`, error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Routes
router.get('/', sendHtmlFile('index'));
router.get('/notes', sendHtmlFile('notes'));

module.exports = router;
