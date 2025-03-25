const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los vehículos
router.get('/vehiculos/', authMiddleware, (req, res) => {
    const sql = 'SELECT * FROM vehiculos';
    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Error en la consulta...' });
        }

        res.status(200).json({ status: 200, message: 'Success', results });
    });
});

// Crear un nuevo vehículo
router.post('/vehiculos', authMiddleware, (req, res) => {
    let vehiculo = req.body;

    if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio || !vehiculo.precio) {
        return res.status(403).json({ status: 403, message: 'Todos los campos requeridos: marca, modelo, anio, precio...' });
    }

    const sql = "INSERT INTO vehiculos (marca, modelo, anio, precio, disponibilidad, descripcion) VALUES (?, ?, ?, ?, ?, ?)";
    pool.query(sql, [vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.precio, vehiculo.disponibilidad || true, vehiculo.descripcion || null], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, message: 'Error al insertar el registro...' });
        }
        vehiculo.id_vehiculo = results.insertId;
        res.status(201).json({ status: 201, message: 'Success', vehiculo });
    });
});

// Actualizar un vehículo
router.put('/vehiculos', authMiddleware, (req, res) => {
    let vehiculo = req.body;

    if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio || !vehiculo.precio || !vehiculo.id_vehiculo) {
        return res.status(403).json({ status: 403, message: 'Todos los campos requeridos: id_vehiculo, marca, modelo, anio, precio...' });
    }

    const sql = "UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, precio = ?, disponibilidad = ?, descripcion = ? WHERE id_vehiculo = ?";
    pool.query(sql, [vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.precio, vehiculo.disponibilidad, vehiculo.descripcion, vehiculo.id_vehiculo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, message: 'Error al actualizar el registro...' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ status: 404 , message: 'Vehículo no encontrado...' });
        }

        res.status(201).json({ status: 201, message: 'Success', vehiculo });
    });
});

// Obtener un vehículo por ID
router.get('/vehiculos/:id_vehiculo', authMiddleware, (req, res) => {
    let id_vehiculo = req.params.id_vehiculo;
    if (!id_vehiculo) {
        return res.status(403).json({ status: 403, message: 'El id_vehiculo es un parámetro requerido...' });
    }

    const sql = "SELECT * FROM vehiculos WHERE id_vehiculo = ?";
    pool.query(sql, [id_vehiculo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, message: 'Error al obtener el registro...' });
        }

        res.status(200).json({ status: 200, message: 'Success', results });
    });
});

// Eliminar un vehículo por ID
router.delete('/vehiculos/:id_vehiculo', authMiddleware, (req, res) => {
    let id_vehiculo = req.params.id_vehiculo;
    if (!id_vehiculo) {
        return res.status(403).json({ status: 403, message: 'El id_vehiculo es un parámetro requerido...' });
    }

    const sql = "DELETE FROM vehiculos WHERE id_vehiculo = ?";
    pool.query(sql, [id_vehiculo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, message: 'Error al eliminar el registro...' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: 'Vehículo no encontrado...' });
        }

        res.status(201).json({ status: 201, message: 'Registro eliminado con éxito' });
    });
});

// Filtrar vehículos por marca, modelo, precio y disponibilidad


module.exports = router;