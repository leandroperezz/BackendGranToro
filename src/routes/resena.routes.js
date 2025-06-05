const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resena.controller');
const authenticateToken = require('./../middleware/auth.middleware'); 

router.get('/', resenaController.getAllResenas); 
router.post('/', authenticateToken, resenaController.createResena); 
router.get('/:id', resenaController.getResenaById);
router.put('/:id', authenticateToken, resenaController.updateResena); 
router.delete('/:id', authenticateToken, resenaController.deleteResena);

module.exports = router;
