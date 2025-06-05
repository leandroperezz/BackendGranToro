const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bovino = sequelize.define('Bovino', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  razaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  peso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genetica: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  efectividad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vendedorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'bovinos',
  timestamps: true,
  underscored: true,
});

module.exports = Bovino;
