const express = require('express');
const router = express.Router();
const razaController = require('../controllers/raza.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', authenticateToken, razaController.getAllRazas); 
router.post('/', authenticateToken, razaController.createRaza); 
router.get('/:id', authenticateToken, razaController.getRazaById); 
router.put('/:id', authenticateToken, razaController.updateRaza); 
router.delete('/:id', authenticateToken, razaController.deleteRaza); 
module.exports = router;
