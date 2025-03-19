const express=require('express');
const app =express();
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();


const PORT = process.env.PORT;

// Middlewares
app.use(cors()); // Permite peticiones desde otros dominios
app.use(express.json()); // Para manejar JSON en las peticiones


// Rutas
<<<<<<< HEAD
const authUserRoutes = require('./routes/authUser');
app.use('/api',authUserRoutes);
=======
app.use('/auth', authRoutes); // Rutas de autenticación (login, registro)
app.use('/usuarios', userRoutes); // Rutas relacionadas con usuarios

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del Autolote');
});
>>>>>>> parent of 07c9b5a (Update app.js)

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: 'Error del servidor' });
});

// Servidor en marcha
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});