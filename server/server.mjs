import express from 'express';
import { ImageHistory, upload, createImageHistory } from './models/imageHistory.mjs';
import { fileURL } from './utils.mjs';
import { getResponse } from './aiResponses.mjs';

const app = express();

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  const fileUrl = fileURL(file);

  try {
    // Agregar entrada al historial de imágenes
    await createImageHistory(req, res);

    // Analizar la imagen
    const response = await analyzeImage(fileUrl);

    res.json({ success: true, message: 'Imagen subida correctamente', data: { analysis: response } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al subir la imagen', data: {} });
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
  console.log('Servidor corriendo en http://localhost:5000');
});

function fileURL(file) {
  return `http://localhost:5000/uploads/${file.filename}`;
}

async function analyzeImage(fileUrl) {
  const image = await loadImage(fileUrl);
  const response = getResponse(image);
  return response;
}

async function loadImage(fileUrl) {
  return { id: 1, url: fileUrl, analysis: 'Análisis detallado de la imagen procesada' };
}
