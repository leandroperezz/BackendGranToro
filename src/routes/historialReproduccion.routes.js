const express = require('express');
const router = express.Router();
const historialReproduccionController = require('../controllers/historialReproduccion.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', authenticateToken, historialReproduccionController.getAllHistorialesReproduccion); 
router.post('/', authenticateToken, historialReproduccionController.createHistorialReproduccion); 
router.get('/:id', authenticateToken, historialReproduccionController.getHistorialReproduccionById); 
router.put('/:id', authenticateToken, historialReproduccionController.updateHistorialReproduccion); 
router.delete('/:id', authenticateToken, historialReproduccionController.deleteHistorialReproduccion);

module.exports = router;
