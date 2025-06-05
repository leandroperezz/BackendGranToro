const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ValorCaracteristica = sequelize.define('ValorCaracteristica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bovinoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caracteristicaGeneticaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'valores_caracteristicas',
  timestamps: true,
  underscored: true,
});

module.exports = ValorCaracteristica;
