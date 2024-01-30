const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises; // Use fs.promises for async/await operations

const readDataFromFile = async () => {
  try {
    const data = await fs.readFile('db/db.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }
};

const writeDataToFile = async (data) => {
  try {
    await fs.writeFile('db/db.json', JSON.stringify(data));
  } catch (error) {
    console.error('Error writing file:', error.message);
    throw error;
  }
};

// Defines the GET request to this route's endpoint '/api/notes'
router.get('/api/notes', async (req, res) => {
  try {
    const dbJson = await readDataFromFile();
    res.json(dbJson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Defines the POST request to this route's endpoint '/api/notes'
router.post('/api/notes', async (req, res) => {
  try {
    const dbJson = await readDataFromFile();
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newFeedback);
    await writeDataToFile(dbJson);
    res.json(dbJson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/api/notes/:id', async (req, res) => {
  try {
    const dataJSON = await readDataFromFile();
    const newNotes = dataJSON.filter((note) => note.id !== req.params.id);
    await writeDataToFile(newNotes);
    res.json('Note deleted.');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
