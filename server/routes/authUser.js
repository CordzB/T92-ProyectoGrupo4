const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();
const bcrypt = require('bcrypt');

require('dotenv').config();

// Ruta para el registro de usuarios
router.post('/registro', async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;

    // Validación de datos de entrada
    if (!nombre || !correo || !contrasena || !rol) {
        return res.status(400).json({ status: 400, message: 'Todos los campos son requeridos' });
    }

    try {
        const saltRound = 10;
        const passwordEncrypt = await bcrypt.hash(contrasena, saltRound);

        const sql = 'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)';
        pool.query(sql, [nombre, correo, passwordEncrypt, rol], (err, resultado) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ status: 500, message: 'Error del servidor al registrar usuario' });
            }
            res.status(201).json({ status: 201, message: 'Usuario registrado con éxito', id_usuario: resultado.insertId });
        });

    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
});

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { nombre, contrasena } = req.body;

    // Validación de datos de entrada
    if (!nombre || !contrasena) {
        return res.status(400).json({ status: 400, message: 'Nombre de usuario y contraseña son requeridos' });
    }

    try {
        const sql = 'SELECT * FROM usuarios WHERE nombre = ?';
        pool.query(sql, [nombre], async (err, resultado) => {
            if (err) {
                console.error('Error al buscar usuario:', err);
                return res.status(500).json({ status: 500, message: 'Error del servidor al buscar usuario' });
            }

            if (resultado.length === 0) {
                return res.status(401).json({ status: 401, message: 'Credenciales inválidas' });
            }

            const user = resultado[0];
            const isMatch = await bcrypt.compare(contrasena, user.contrasena);

            if (!isMatch) {
                return res.status(401).json({ status: 401, message: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: user.id_usuario, nombre: user.nombre, rol: user.rol },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
            res.status(200).json({ status: 200, message: 'Inicio de sesión exitoso', token });
        });

    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
});

module.exports = router;
