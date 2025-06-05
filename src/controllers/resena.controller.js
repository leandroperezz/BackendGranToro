const { Resena, User } = require('../models');


exports.getAllResenas = async (req, res) => {
  try {
    const resenas = await Resena.findAll({
      include: [
        { model: User, as: 'compradorResena', attributes: { exclude: ['password'] } },
        { model: User, as: 'vendedorResena', attributes: { exclude: ['password'] } },
      ],
    });
    res.status(200).json(resenas);  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};


exports.createResena = async (req, res) => {
  try {
    const { compradorId, vendedorId, calificacion } = req.body;
    if (!compradorId || !vendedorId || !calificacion) {
      return res.status(400).json({ message: 'Comprador, vendedor y calificación son requeridos.' });  
    }
    if (typeof calificacion !== 'number' || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 5.' });  
    }

    const newResena = await Resena.create(req.body);
    res.status(201).json(newResena);  
  } catch (error) {
    res.status(400).json({ message: error.message });  
  }
};


exports.getResenaById = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id, {
      include: [
        { model: User, as: 'compradorResena', attributes: { exclude: ['password'] } },
        { model: User, as: 'vendedorResena', attributes: { exclude: ['password'] } },
      ],
    });
    if (!resena) {
      return res.status(404).json({ message: 'Reseña no encontrada' }); 
    }
    res.status(200).json(resena);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};


exports.updateResena = async (req, res) => {
  try {
    const { calificacion } = req.body;
    if (calificacion !== undefined && (typeof calificacion !== 'number' || calificacion < 1 || calificacion > 5)) {
      return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 5.' });  
    }

    const [updatedRows] = await Resena.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Reseña no encontrada o sin cambios' });  
    }
    const updatedResena = await Resena.findByPk(req.params.id);
    res.status(200).json(updatedResena);  
  } catch (error) {
    res.status(400).json({ message: error.message });  
  }
};


exports.deleteResena = async (req, res) => {
  try {
    const deletedRows = await Resena.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Reseña no encontrada' });  
    }
    res.status(204).send();  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};
