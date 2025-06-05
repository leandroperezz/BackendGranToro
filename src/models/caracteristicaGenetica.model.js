const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CaracteristicaGenetica = sequelize.define('CaracteristicaGenetica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_caracteristica: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'caracteristicas_geneticas',
  timestamps: true,
  underscored: true,
});

module.exports = CaracteristicaGenetica;
