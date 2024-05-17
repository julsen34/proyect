// backend/controllers/plantController.js
const Plant = require('../models/Plant');

exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.user.id });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPlant = async (req, res) => {
  const { name, species, wateringInterval, temperatureRange, humidityRange } = req.body;
  const newPlant = new Plant({
    name,
    species,
    wateringInterval,
    temperatureRange,
    humidityRange,
    userId: req.user.id
  });

  try {
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
