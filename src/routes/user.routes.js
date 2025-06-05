const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware'); 

router.get('/', authenticateToken, userController.getAllUsers); 
router.post('/', userController.createUser);

router.get('/:id', authenticateToken, userController.getUserById); 
router.put('/:id', authenticateToken, userController.updateUser); 
router.delete('/:id', authenticateToken, userController.deleteUser); 

module.exports = router;