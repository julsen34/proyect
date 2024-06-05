//imageHistory.js

import mongoose from 'mongoose';
import multer from 'multer';

// Conectar con MongoDB
const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/proyect/image-history', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

// Define el esquema de ImageHistory
const imageHistorySchema = new mongoose.Schema({
  imageSrc: String,
  response: String,
  date: Date
});

// Modelo de ImageHistory
const ImageHistory = mongoose.model('ImageHistory', imageHistorySchema);

// Multer
const upload = multer({ dest: '/Users/fuerz/proyect/uploads' });

// Define la función createImageHistory
const createImageHistory = async (req, res) => {
  // Obtener el archivo de imagen subido
  const file = req.file;

  // Crear un nuevo documento de ImageHistory
  const imageHistory = new ImageHistory({
    imageSrc: `/Users/fuerz/proyect/images/${file.filename}`,
    response: '',
    date: new Date().toISOString()
  });

  // Guardar el documento de ImageHistory
  await imageHistory.save();

  // Redirigir a la página de historial de imágenes
  res.redirect('../proyect/historialDeImagenes.html');
};

// Exporta el modelo ImageHistory, la instancia de Multer y la función createImageHistory
export { ImageHistory, upload, createImageHistory };
