const express = require('express');
const router = express.Router();
const caracteristicaGeneticaController = require('../controllers/caracteristicaGenetica.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', authenticateToken, caracteristicaGeneticaController.getAllCaracteristicasGeneticas); 
router.post('/', authenticateToken, caracteristicaGeneticaController.createCaracteristicaGenetica); 
router.get('/:id', authenticateToken, caracteristicaGeneticaController.getCaracteristicaGeneticaById); 
router.put('/:id', authenticateToken, caracteristicaGeneticaController.updateCaracteristicaGenetica); 
router.delete('/:id', authenticateToken, caracteristicaGeneticaController.deleteCaracteristicaGenetica); 

module.exports = router;
