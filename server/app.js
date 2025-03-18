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
const authuserRoutes = require('./routes/authUsers');
app.use('/auth', authuserRoutes); // Rutas de autenticación (login, registro)



// Servidor en marcha
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});