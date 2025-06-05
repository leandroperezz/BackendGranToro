const { Mensaje, User } = require('../models');

// Listar todos los mensajes
exports.getAllMensajes = async (req, res) => {
  try {
    const { emisorId, receptorId } = req.query;
    const whereClause = {};

    if (emisorId) {
      whereClause.emisorId = emisorId;
    }
    if (receptorId) {
      whereClause.receptorId = receptorId;
    }

    const mensajes = await Mensaje.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'emisor', attributes: { exclude: ['password'] } },
        { model: User, as: 'receptor', attributes: { exclude: ['password'] } },
      ],
      order: [['enviadoEn', 'DESC']],
    });
    res.status(200).json(mensajes); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};

// Crear un nuevo mensaje
exports.createMensaje = async (req, res) => {
  try {
    const { emisorId, receptorId, contenido } = req.body;
    if (!emisorId || !receptorId || !contenido) {
      return res.status(400).json({ message: 'Emisor, receptor y contenido del mensaje son requeridos.' }); // 
    }
    // Aquí podrían validar que emisorId y receptorId existan como usuarios

    const newMensaje = await Mensaje.create(req.body);
    res.status(201).json(newMensaje); // 
  } catch (error) {
    res.status(400).json({ message: error.message }); // 
  }
};

// Obtener un mensaje por ID
exports.getMensajeById = async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id, {
      include: [
        { model: User, as: 'emisor', attributes: { exclude: ['password'] } },
        { model: User, as: 'receptor', attributes: { exclude: ['password'] } },
      ],
    });
    if (!mensaje) {
      return res.status(404).json({ message: 'Mensaje no encontrado' }); // 
    }
    res.status(200).json(mensaje); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};

// Actualizar un mensaje por ID
exports.updateMensaje = async (req, res) => {
  try {
    const [updatedRows] = await Mensaje.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Mensaje no encontrado o sin cambios' }); // 
    }
    const updatedMensaje = await Mensaje.findByPk(req.params.id);
    res.status(200).json(updatedMensaje); // 
  } catch (error) {
    res.status(400).json({ message: error.message }); // 
  }
};

// Eliminar un mensaje por ID
exports.deleteMensaje = async (req, res) => {
  try {
    const deletedRows = await Mensaje.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Mensaje no encontrado' }); // 
    }
    res.status(204).send(); // 
  } catch (error) {
    res.status(500).json({ message: error.message }); // 
  }
};
