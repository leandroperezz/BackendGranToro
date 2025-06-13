const { User } = require('../models');
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en las variables de entorno.");
  process.exit(1);
}


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};


exports.createUser = async (req, res) => {
  try {
    
    const { name, email, password, telefono } = req.body;
    if (!name || !email || !password || !telefono) {
      return res.status(400).json({ message: 'Nombre, email, contraseña y teléfono son requeridos.' }); // 
    }
    

    const newUser = await User.create(req.body);
    const userResponse = newUser.toJSON();
    delete userResponse.password; 
    res.status(201).json(userResponse);
  } 
  catch (error) {
    
    res.status(400).json({ message: error.message }); // 
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });  
    }
    res.status(200).json(user);  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};


exports.updateUser = async (req, res) => {
  try {
    const [updatedRows] = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true 
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado o sin cambios' });  
    }
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(updatedUser); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deletedRows = await User.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });  
    }
    res.status(204).send();  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos.' });  
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });  
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });  
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); 

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(200).json({  
      message: 'Login exitoso',
      token: token,
      user: userResponse
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor: ' + error.message });  
  }
};
