//imageHistory.js

import mongoose from 'mongoose';
import multer from 'multer';

const imageHistorySchema = new mongoose.Schema({
  filename: String,
  url: String,
  date: Date
});

const ImageHistory = mongoose.model('ImageHistory', imageHistorySchema);

const upload = multer({ dest: 'uploads/' });

export const createImageHistory = async (req, res) => {
  // Get the uploaded image file
  const file = req.file;

  // Create a new ImageHistory document
  const imageHistory = new ImageHistory({
    filename: file.filename,
    url: `http://localhost:3000/uploads/${file.filename}`,
    date: new Date().toISOString()
  });

  // Save the ImageHistory document
  await imageHistory.save();

  // Redirect to the image history page
  res.redirect('/image-history');
};

export { ImageHistory, upload };