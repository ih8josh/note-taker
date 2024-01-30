const router = require('express').Router();
const path = require('path');

// Define path constants for better readability
const publicPath = path.join(__dirname, '../public');
const indexPath = path.join(publicPath, 'index.html');
const notesPath = path.join(publicPath, 'notes.html');

// Route that sends 'index.html' as a response to a client when a GET request is made
router.get('/', (req, res) => {
  try {
    res.sendFile(indexPath);
  } catch (error) {
    console.error('Error sending file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route that sends 'notes.html' as a response to a client when a GET request is made
router.get('/notes', (req, res) => {
  try {
    res.sendFile(notesPath);
  } catch (error) {
    console.error('Error sending file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
