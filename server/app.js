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
app.use('/auth', authRoutes); // Rutas de autenticación (login, registro)
app.use('/usuarios', userRoutes); // Rutas relacionadas con usuarios

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del Autolote');
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: 'Error del servidor' });
});

// Servidor en marcha
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});