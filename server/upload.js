// Import the upload middleware
import upload from './upload.js';

// Define the route handler for image uploads
app.post('/upload', upload.single('image'), async (req, res) => {
  // Get the uploaded image file
  const file = req.file;

  // Create a new ImageHistory document
  const imageHistory = new ImageHistory({
    imageSrc: `./images/${file.filename}`,
    response: '',
    date: new Date().toISOString()
  });

  // Save the ImageHistory document
  await imageHistory.save();

  // Redirect to the image history page
  res.redirect('/image-history');
});