const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const dataFilePath = 'db/db.json';

const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }
};

const writeDataToFile = async (data) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing file:', error.message);
    throw error;
  }
};

router.get('/api/notes', async (req, res) => {
  try {
    const dbJson = await readDataFromFile();
    res.json(dbJson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/notes', async (req, res) => {
  try {
    const dbJson = await readDataFromFile();
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newNote);
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
    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
