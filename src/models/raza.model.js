const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Raza = sequelize.define('Raza', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'razas',
  timestamps: true,
  underscored: true,
});

module.exports = Raza;
