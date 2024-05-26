//app.js

import express from 'express';
import mongoose from 'mongoose';
import { ImageHistory, upload, createImageHistory } from './models/imageHistory.js';

const app = express();
const port = 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/plant-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos MongoDB');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos MongoDB:', error);
  });

app.get('/api/history', async (req, res) => {
  try {
    const history = await ImageHistory.find().exec();
    res.json(history);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/history', async (req, res) => {
  try {
    const newEntry = new ImageHistory(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    await createImageHistory(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});