const sequelize = require('../config/database');
const User = require('./user.model');
const Bovino = require('./bovino.model');
const Raza = require('./raza.model');
const Resena = require('./resena.model');
const CaracteristicaGenetica = require('./caracteristicaGenetica.model');
const ValorCaracteristica = require('./valorCaracteristica.model');
const HistorialReproduccion = require('./historialReproduccion.model');


User.hasMany(Bovino, { foreignKey: 'vendedorId', as: 'bovinosEnVenta' });
Bovino.belongsTo(User, { foreignKey: 'vendedorId', as: 'propietario' });

Raza.hasMany(Bovino, { foreignKey: 'razaId' });
Bovino.belongsTo(Raza, { foreignKey: 'razaId', as: 'raza' });

User.hasMany(Resena, { foreignKey: 'compradorId', as: 'resenasRealizadas' });
Resena.belongsTo(User, { foreignKey: 'compradorId', as: 'compradorResena' });
User.hasMany(Resena, { foreignKey: 'vendedorId', as: 'resenasRecibidas' });
Resena.belongsTo(User, { foreignKey: 'vendedorId', as: 'vendedorResena' });

Bovino.belongsToMany(CaracteristicaGenetica, {
  through: ValorCaracteristica,
  foreignKey: 'bovinoId',
  otherKey: 'caracteristicaGeneticaId',
  as: 'caracteristicasGeneticas'
});
CaracteristicaGenetica.belongsToMany(Bovino, {
  through: ValorCaracteristica,
  foreignKey: 'caracteristicaGeneticaId',
  otherKey: 'bovinoId',
  as: 'bovinosAsociados'
});

Bovino.hasMany(ValorCaracteristica, { foreignKey: 'bovinoId', as: 'valoresDeCaracteristicas' });
ValorCaracteristica.belongsTo(Bovino, { foreignKey: 'bovinoId' });
ValorCaracteristica.belongsTo(CaracteristicaGenetica, { foreignKey: 'caracteristicaGeneticaId', as: 'caracteristicaAsociada' })

Bovino.hasMany(HistorialReproduccion, { foreignKey: 'bovinoId', as: 'historialReproductivo' });
HistorialReproduccion.belongsTo(Bovino, { foreignKey: 'bovinoId', as: 'bovino' });
  

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente.');
  } 
  catch (error) {
    console.error('Error al conectar o sincronizar la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  User,
  Bovino,
  Raza,
  Resena,
  CaracteristicaGenetica,
  ValorCaracteristica,
  HistorialReproduccion,
  syncDatabase,
};
