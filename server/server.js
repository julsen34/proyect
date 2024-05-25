const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const upload = multer({ dest: 'uploads/' });
const { ImageHistory } = require('./models/imageHistory');

const AI_MODEL_API_URL = 'http://localhost:3001/ai/analyze';

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  const fileUrl = `http://localhost:5000/uploads/${file.filename}`;

  try {
    const response = await axios.post(AI_MODEL_API_URL, { fileUrl });
    res.json({ success: true, message: response.data.message, data: response.data.data });

    // Add image history entry
    await new ImageHistory({ filename: file.filename, url: fileUrl }).save();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al procesar la imagen', data: {} });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await ImageHistory.find().sort({ createdAt: -1 });
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el historial de imágenes', data: {} });
  }
});

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});