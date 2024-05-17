// backend/models/Plant.js //
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/proyect');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  lastWatered: { type: Date, default: Date.now },
  wateringInterval: { type: Number, required: true },
  temperatureRange: { min: Number, max: Number },
  humidityRange: { min: Number, max: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Plant', plantSchema);
