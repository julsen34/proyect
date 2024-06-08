// aiModel.mjs

import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.post('/ai/analyze', async (req, res) => {
  const { fileUrl } = req.body;

  try {
    const response = await analyzeImage(fileUrl);
    res.json({ success: true, message: 'Imagen procesada correctamente', data: { analysis: response } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al procesar la imagen', data: {} });
  }
});

async function analyzeImage(fileUrl) {
  
  const image = await loadImage(fileUrl);
  const analysis = {
    health: 'good',
    water: 'normal', 
    light: 'normal' 
  };
  const response = generateResponse(analysis);
  return response;
}

async function loadImage(fileUrl) {
  return { id: 1, url: fileUrl, analysis: 'Análisis detallado de la imagen procesada' };
}

app.listen(3001, () => {
  console.log('Modelo AI corriendo en el puerto 3001');
});

