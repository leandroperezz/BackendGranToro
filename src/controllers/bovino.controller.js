const { Bovino, Raza, User, ValorCaracteristica, CaracteristicaGenetica, HistorialReproduccion } = require('../models');
const { Op } = require('sequelize'); 

exports.getAllBovinos = async (req, res) => {
  try {
    const { razaId, pesoMin, pesoMax, precioMin, precioMax, ubicacion } = req.query;
    const whereClause = {};

    if (razaId) {
      whereClause.razaId = razaId;
    }
    if (pesoMin && pesoMax) {
      whereClause.peso = { [Op.between]: [parseInt(pesoMin), parseInt(pesoMax)] };
    } else if (pesoMin) {
      whereClause.peso = { [Op.gte]: parseInt(pesoMin) };
    } else if (pesoMax) {
      whereClause.peso = { [Op.lte]: parseInt(pesoMax) };
    }
    if (precioMin && precioMax) {
      whereClause.precio = { [Op.between]: [parseInt(precioMin), parseInt(precioMax)] };
    } else if (precioMin) {
      whereClause.precio = { [Op.gte]: parseInt(precioMin) };
    } else if (precioMax) {
      whereClause.precio = { [Op.lte]: parseInt(precioMax) };
    }
    if (ubicacion) {
      whereClause.ubicacion = { [Op.like]: '%${ubicacion}%' };
    }

    const bovinos = await Bovino.findAll({
      where: whereClause,
      include: [
        { model: Raza, as: 'raza' },
        { model: User, as: 'propietario', attributes: { exclude: ['password'] } },
        { model: ValorCaracteristica, as: 'caracteristicasGeneticas',
          include: { model: CaracteristicaGenetica }
        },
        { model: HistorialReproduccion, as: 'historialReproductivo' }
      ],
    });
    res.status(200).json(bovinos);  
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBovino = async (req, res) => {
  try {
    const { edad, peso, precio, vendedorId } = req.body;
    if (!edad || !peso || !precio || !vendedorId) {
      return res.status(400).json({ message: 'Edad, peso, precio y vendedorId son requeridos.' }); 
    }

    const newBovino = await Bovino.create(req.body);
    res.status(201).json(newBovino);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBovinoById = async (req, res) => {
  try {
    const bovino = await Bovino.findByPk(req.params.id, {
      include: [
        { model: Raza, as: 'raza' },
        { model: User, as: 'propietario', attributes: { exclude: ['password'] } },
        { model: ValorCaracteristica, as: 'caracteristicasGeneticas',
          include: { model: CaracteristicaGenetica }
        },
        { model: HistorialReproduccion, as: 'historialReproductivo' }
      ],
    });
    if (!bovino) {
      return res.status(404).json({ message: 'Bovino no encontrado' });
    }
    res.status(200).json(bovino);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBovino = async (req, res) => {
  try {
    const [updatedRows] = await Bovino.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Bovino no encontrado o sin cambios' }); 
    }
    const updatedBovino = await Bovino.findByPk(req.params.id, {
      include: [
        { model: Raza, as: 'raza' },
        { model: User, as: 'propietario', attributes: { exclude: ['password'] } },
      ],
    });
    res.status(200).json(updatedBovino);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBovino = async (req, res) => {
  try {
    const deletedRows = await Bovino.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Bovino no encontrado' });
    }
    res.status(204).send();
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
