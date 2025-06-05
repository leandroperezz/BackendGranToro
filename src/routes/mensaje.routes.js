const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensaje.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', authenticateToken, mensajeController.getAllMensajes); 
router.post('/', authenticateToken, mensajeController.createMensaje); 
router.get('/:id', authenticateToken, mensajeController.getMensajeById); 
router.put('/:id', authenticateToken, mensajeController.updateMensaje); 
router.delete('/:id', authenticateToken, mensajeController.deleteMensaje); 

module.exports = router;
