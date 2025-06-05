const express = require('express');
const router = express.Router();
const bovinoController = require('../controllers/bovino.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/', bovinoController.getAllBovinos); 
router.get('/:id', bovinoController.getBovinoById); 

router.post('/', authenticateToken, bovinoController.createBovino); 
router.put('/:id', authenticateToken, bovinoController.updateBovino); 
router.delete('/:id', authenticateToken, bovinoController.deleteBovino); 

module.exports = router;