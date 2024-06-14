// server/models/imageHistory.mjs

import pool from '../db.js';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });

async function createImageHistory(req, res) {
  const file = req.file;
  const imageSrc = `/uploads/${file.filename}`;
  const date = new Date().toISOString();

  try {
    await pool.query('INSERT INTO image_history (imageSrc, response, date) VALUES (?, ?, ?)', [imageSrc, '', date]);
    res.redirect('historialDeImagenes.html');
  } catch (error) {
    console.error('Error al guardar el historial de imágenes:', error);
    res.status(500).send('Error interno del servidor');
  }
}

export { createImageHistory, upload };
