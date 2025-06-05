const { Raza } = require('../models');

// Obtener todas las razas
exports.getAllRazas = async (req, res) => {
  try {
    const razas = await Raza.findAll();
    res.status(200).json(razas); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};

// Crear una nueva raza
exports.createRaza = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre de la raza es requerido.' }); // 
    }
    const newRaza = await Raza.create(req.body);
    res.status(201).json(newRaza); // 
  } catch (error) {
    res.status(400).json({ message: error.message }); // 
  }
};

// Obtener una raza por ID
exports.getRazaById = async (req, res) => {
  try {
    const raza = await Raza.findByPk(req.params.id);
    if (!raza) {
      return res.status(404).json({ message: 'Raza no encontrada' }); // 
    }
    res.status(200).json(raza); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};

// Actualizar una raza por ID
exports.updateRaza = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre de la raza es requerido.' }); // 
    }
    const [updatedRows] = await Raza.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Raza no encontrada o sin cambios' }); // 
    }
    const updatedRaza = await Raza.findByPk(req.params.id);
    res.status(200).json(updatedRaza); // 
  } catch (error) {
    res.status(400).json({ message: error.message }); // 
  }
};

// Eliminar una raza por ID
exports.deleteRaza = async (req, res) => {
  try {
    const deletedRows = await Raza.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Raza no encontrada' }); // 
    }
    res.status(204).send(); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};
