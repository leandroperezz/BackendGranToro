const { CaracteristicaGenetica } = require('../models');

// Obtener todas las características genéticas
exports.getAllCaracteristicasGeneticas = async (req, res) => {
  try {
    const caracteristicas = await CaracteristicaGenetica.findAll();
    res.status(200).json(caracteristicas); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};

// Crear una nueva característica genética
exports.createCaracteristicaGenetica = async (req, res) => {
  try {
    const { nombre_caracteristica } = req.body;
    if (!nombre_caracteristica) {
      return res.status(400).json({ message: 'El nombre de la característica es requerido.' }); // 
    }
    const newCaracteristica = await CaracteristicaGenetica.create(req.body);
    res.status(201).json(newCaracteristica); // 
  } catch (error) {
    res.status(400).json({ message: error.message }); // 
  }
};

// Obtener una característica genética por ID
exports.getCaracteristicaGeneticaById = async (req, res) => {
  try {
    const caracteristica = await CaracteristicaGenetica.findByPk(req.params.id);
    if (!caracteristica) {
      return res.status(404).json({ message: 'Característica genética no encontrada' }); // 
    }
    res.status(200).json(caracteristica); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};

// Actualizar una característica genética por ID
exports.updateCaracteristicaGenetica = async (req, res) => {
  try {
    const { nombre_caracteristica } = req.body;
    if (!nombre_caracteristica) {
      return res.status(400).json({ message: 'El nombre de la característica es requerido.' }); // 
    }
    const [updatedRows] = await CaracteristicaGenetica.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Característica genética no encontrada o sin cambios' }); // 
    }
    const updatedCaracteristica = await CaracteristicaGenetica.findByPk(req.params.id);
    res.status(200).json(updatedCaracteristica); // 
  } catch (error) {
    res.status(400).json({ message: error.message }); // 
  }
};

// Eliminar una característica genética por ID
exports.deleteCaracteristicaGenetica = async (req, res) => {
  try {
    const deletedRows = await CaracteristicaGenetica.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Característica genética no encontrada' }); // 
    }
    res.status(204).send(); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};
