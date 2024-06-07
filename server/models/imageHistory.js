
// models/imageHistory.mjs

import mongoose from 'mongoose';
import multer from 'multer';

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/proyect/image-history', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connect();
 
const imageHistorySchema = new mongoose.Schema({
  imageSrc: String,
  response: String,
  date: { type: Date, default: Date.now }
});

const ImageHistory = mongoose.model('ImageHistory', imageHistorySchema);

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
    console.error("Error saving image history:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { ImageHistory, upload, createImageHistory };
