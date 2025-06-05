const express = require('express');
const router = express.Router();
const valorCaracteristicaController = require('../controllers/valorCaracteristica.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', authenticateToken, valorCaracteristicaController.getAllValoresCaracteristicas); 
router.post('/', authenticateToken, valorCaracteristicaController.createValorCaracteristica); 
router.get('/:id', authenticateToken, valorCaracteristicaController.getValorCaracteristicaById); 
router.put('/:id', authenticateToken, valorCaracteristicaController.updateValorCaracteristica); 
router.delete('/:id', authenticateToken, valorCaracteristicaController.deleteValorCaracteristica);

module.exports = router;