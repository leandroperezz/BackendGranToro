const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resena = sequelize.define('Resena', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  compradorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vendedorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    }
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'resenas',
  timestamps: true,
  underscored: true,
});

module.exports = Resena;
