//upload.js

// Importar el middleware de carga (subida)
import upload from './upload.mjs';

// Definir el controlador de ruta para las cargas de imágenes
app.post('/upload', upload.single('image'), async (req, res) => {
  // Get the uploaded image file
  const file = req.file;

  // Crear un nuevo documento de historial de imágenes
  const imageHistory = new ImageHistory({
    imageSrc: `./images/${file.filename}`,
    response: '',
    date: new Date().toISOString()
  });

  // Guardar el documento de historial de imágenes
  await imageHistory.save('./models/imageHistory.js');

  // Redirigir a la página de historial de imágenes
  res.redirect('/image-history');
});