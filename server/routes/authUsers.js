const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

require('dotenv').config();

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE correo = ?';

    pool.query(sql, [correo], async (err, resultado) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Error del servidor' });
        }

        if (resultado.length === 0) {
            return res.status(401).json({ status: 401, message: 'Credenciales inválidas...' });
        }

        let user = resultado[0];

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);

        if (!isMatch) {
            return res.status(401).json({ status: 401, message: 'Credenciales inválidas...' });
        }

        const token = jwt.sign(
            { id: user.id_usuario, correo: user.correo },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.json({ status: 200, message: 'Success', token });
    });
});

router.post('/usuarios', authMiddleware, async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;

    const sql = 'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)';

    const saltRound = 10;
    const passwordEncrypt = await bcrypt.hash(contraseña, saltRound);

    pool.query(sql, [nombre, correo, passwordEncrypt, rol], (err, resultado) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Error del servidor' });
        }

        res.json({ status: 200, message: 'Success', id_usuario: resultado.insertId });
    });
});

module.exports = router;
