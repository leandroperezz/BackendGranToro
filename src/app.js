const express = require('express'); 
const dotenv = require('dotenv');
const cors = require('cors');
const { syncDatabase } = require('./models');

const authRoutes = require('./routes/auth.routes');
const bovinoRoutes = require('./routes/bovino.routes');
const razaRoutes = require('./routes/raza.routes');
const userRoutes = require('./routes/user.routes');
const resenaRoutes = require('./routes/resena.routes');
const caracteristicaGeneticaRoutes = require('./routes/caracteristicaGenetica.routes');
const valorCaracteristicaRoutes = require('./routes/valorCaracteristica.routes');
const historialReproduccionRoutes = require('./routes/historialReproduccion.routes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/bovinos', bovinoRoutes);
app.use('/api/razas', razaRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/resenas', resenaRoutes);
app.use('/api/caracteristicas-geneticas', caracteristicaGeneticaRoutes);
app.use('/api/valores-caracteristicas', valorCaracteristicaRoutes);
app.use('/api/historiales-reproduccion', historialReproduccionRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

syncDatabase().then(() => {
  app.listen(PORT, (error) => {
    if (!error) {
      console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
      console.log(`Base de datos SQLite en: ${process.env.DB_STORAGE}`);
      console.log(`Archivos estáticos servidos desde: ${path.join(__dirname, '..', 'public')}`);
    } else {
      console.log("Error al iniciar el servidor:", error);
    }
  });
}).catch(err => {
  console.error('La aplicación no pudo iniciar debido a un error de base de datos:', err);
});