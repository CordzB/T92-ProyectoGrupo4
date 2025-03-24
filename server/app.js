const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');
const authUserRoutes = require('./routes/authUser');
const clientesRoutes = require('./routes/clientes')

app.use(express.json());
app.use(cors());

app.use('/api', vehiculoRoutes);
app.use('/api', authUserRoutes);
app.use('/api', clientesRoutes)

app.get('/api/posts', async (req, res) => {
    try {
        const otherResponse = await axios.get(process.env.URL_API_TERCERO + '/posts');
        res.status(200).json({ status: 200, message: 'success', data: otherResponse.data });
    } catch (error) {
        console.error('Error al obtener datos de la API externa:', error);
        res.status(500).json({ status: 500, message: 'Error al obtener los datos de la API externa' });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const posts = req.body;
        const otherResponse = await axios.post(process.env.URL_API_TERCERO + '/posts', posts);
        res.status(201).json({ status: 201, message: 'success', data: otherResponse.data });
    } catch (error) {
        console.error('Error al enviar datos a la API externa:', error);
        res.status(500).json({ status: 500, message: 'Error al enviar los datos a la API externa' });
    }
});

// Manejo de errores general
app.use((err, req, res, next) => {
    console.error('Error general:', err.stack);
    res.status(500).json({ status: 500, message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


