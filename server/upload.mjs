/* eslint-disable no-undef */
//upload.js

// Importar el middleware de carga (subida)
import upload from './upload.mjs';

// Definir el controlador de ruta para las cargas de imágenes
app.post('/upload.mjs', upload.single('image'), async (req, res) => {
  // Get the uploaded image file
  const file = req.file;

  // Crear un nuevo documento de historial de imágenes
  const imageHistory = new imageHistory({
    imageSrc: `./images/${file.filename}`,
    response: '',
    date: new Date().toISOString()
  });

  // Guardar el documento de historial de imágenes
  await imageHistory.save('/server/models/imageHistory.mjs');

  // Redirigir a la página de historial de imágenes
  res.redirect('historialdeimagenes.html');
});