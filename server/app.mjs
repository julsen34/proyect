// app.mjs

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import User from './models/user.mjs';
import { ImageHistory, upload, createImageHistory } from './models/imageHistory.js';

const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/plant-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado a la base de datos MongoDB');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos MongoDB:', error);
  });

// Rutas para el historial de imágenes
app.get('/api/history', async (req, res) => {
  try {
    const history = await ImageHistory.find().exec();
    res.json(history);
  } catch (error) {
    console.error('Error al obtener el historial de imágenes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/api/history', async (req, res) => {
  try {
    const newEntry = new ImageHistory(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
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
  return `http://localhost:5000/uploads/${file.filename}`;
}

// Función para analizar la imagen
async function analyzeImage(fileUrl) {
  // Implementa la lógica de análisis de imágenes aquí
}

// Ruta para el registro de usuarios
app.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear una nueva instancia de usuario utilizando el modelo
    const newUser = new User({ nombre, email, password });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
