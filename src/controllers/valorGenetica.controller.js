const { ValorCaracteristica, Bovino, CaracteristicaGenetica } = require('../models');

exports.getAllValoresCaracteristicas = async (req, res) => {
  try {
    const valores = await ValorCaracteristica.findAll({
      include: [
        { model: Bovino, as: 'Bovino' },
        { model: CaracteristicaGenetica, as: 'CaracteristicaGenetica' },
      ],
    });
    res.status(200).json(valores);  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};

exports.createValorCaracteristica = async (req, res) => {
  try {
    const { bovinoId, caracteristicaGeneticaId, valor } = req.body;
    if (!bovinoId || !caracteristicaGeneticaId || !valor) {
      return res.status(400).json({ message: 'BovinoId, CaracteristicaGeneticaId y valor son requeridos.' }); // 
    }

    const newValor = await ValorCaracteristica.create(req.body);
    res.status(201).json(newValor);  
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

exports.getValorCaracteristicaById = async (req, res) => {
  try {
    const valor = await ValorCaracteristica.findByPk(req.params.id, {
      include: [
        { model: Bovino, as: 'Bovino' },
        { model: CaracteristicaGenetica, as: 'CaracteristicaGenetica' },
      ],
    });
    if (!valor) {
      return res.status(404).json({ message: 'Valor de característica no encontrado' });  
    }
    res.status(200).json(valor);  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};

exports.updateValorCaracteristica = async (req, res) => {
  try {
    const [updatedRows] = await ValorCaracteristica.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Valor de característica no encontrado o sin cambios' });  
    }
    const updatedValor = await ValorCaracteristica.findByPk(req.params.id);
    res.status(200).json(updatedValor);  
  } catch (error) {
    res.status(400).json({ message: error.message });  
  }
};

exports.deleteValorCaracteristica = async (req, res) => {
  try {
    const deletedRows = await ValorCaracteristica.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Valor de característica no encontrado' });  
    }
    res.status(204).send();  
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
};
