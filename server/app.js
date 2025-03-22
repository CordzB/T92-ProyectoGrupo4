const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const tipoCambioRoutes = require('./routes/tipoCambio.routes');
const vehiculoRoutes = require('./routes/vehiculos');
const authUserRoutes = require('./routes/authUser');


app.use(express.json());
app.use(cors());

app.use('/tipo-cambio', tipoCambioRoutes);
app.use('/api', vehiculoRoutes);
app.use('/api', authUserRoutes);



// Manejo de errores general
app.use((err, req, res, next) => {
    console.error('Error general:', err.stack);
    res.status(500).json({ status: 500, message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});