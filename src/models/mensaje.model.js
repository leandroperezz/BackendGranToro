const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mensaje = sequelize.define('Mensaje', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emisorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receptorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  enviadoEn: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'mensajes',
  timestamps: false,
  underscored: true,
});

module.exports = Mensaje;
