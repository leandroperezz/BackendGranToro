const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistorialReproduccion = sequelize.define('HistorialReproduccion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bovinoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fechaEvento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipoEvento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  criasNacidas: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  efectividadEvento: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  tableName: 'historiales_reproduccion',
  timestamps: true,
  underscored: true,
});

module.exports = HistorialReproduccion;
