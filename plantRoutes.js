// backend/routes/plantRoutes.js
const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, plantController.getPlants);
router.post('/', authMiddleware, plantController.addPlant);

module.exports = router;
