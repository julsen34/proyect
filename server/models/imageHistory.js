// imageHistory.mjs

import mongoose from 'mongoose';
import multer from 'multer';

const imageHistorySchema = new mongoose.Schema({
  imageSrc: String,
  response: String,
  date: { type: Date, default: Date.now }
});

const ImageHistory = mongoose.model('imageHistory', imageHistorySchema);

const upload = multer({ dest: 'public/uploads/' });

const createImageHistory = async (req, res) => {
  const file = req.file;

  const imageHistory = new ImageHistory({
    imageSrc: `/uploads/${file.filename}`,
    response: '',
    date: new Date().toISOString()
  });

  try {
    await imageHistory.save();
    res.redirect('historialDeImagenes.html');
  } catch (error) {
    console.error('Error al guardar el historial de imágenes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export { ImageHistory, upload, createImageHistory };
