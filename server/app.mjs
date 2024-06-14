// server/app.mjs

import express from 'express';
import cors from 'cors';
import pool from './db.js';
import multer from 'multer';
import { createImageHistory, ImageHistory, upload } from './models/imageHistory.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Rutas para el historial de imágenes
app.get('/api/history', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM image_history');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener el historial de imágenes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/api/history', async (req, res) => {
  try {
    const { imageSrc, response, date } = req.body;
    const [result] = await pool.query('INSERT INTO image_history (imageSrc, response, date) VALUES (?, ?, ?)', [imageSrc, response, date]);
    res.status(201).json({ id: result.insertId, imageSrc, response, date });
  } catch (error) {
    console.error('Error al guardar la entrada en el historial de imágenes:', error);
    res.status(400).send('Solicitud incorrecta');
  }
});

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  const fileUrl = fileURL(file);

  try {
    await createImageHistory(req, res);
    const response = await analyzeImage(fileUrl);
    res.json({ success: true, message: 'Imagen subida correctamente', data: { analysis: response } });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor', data: {} });
  }
});

// Middleware para manejar errores de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Error interno del servidor'
    }
  });
});

// Función para generar la URL del archivo
function fileURL(file) {
  return `http://localhost:3000/uploads/${file.filename}`;
}

// Función para analizar la imagen
async function analyzeImage(fileUrl) {
  // Implementa la lógica de análisis de imágenes aquí
}

// server/app.mjs 
import { findUserByEmail, createUser } from './models/user.mjs';

app.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const userId = await createUser({ nombre, email, password });
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
