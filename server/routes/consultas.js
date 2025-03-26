const express = require('express')
const router = express.Router()
const pool = require('../config/db')
const authMiddleware = require('../middleware/authMiddleware')


// Crear una nueva consulta
router.post('/consultas', authMiddleware, async (req, res) => {
    const { id_cliente, id_vehiculo, mensaje } = req.body;

    if (!id_cliente || !id_vehiculo || !mensaje) {
        return res.status(400).json({ status: 400, message: 'Faltan campos requeridos' });
    }

    try {
        const sql = `
            INSERT INTO consultas (id_cliente, id_vehiculo, mensaje)
            VALUES (?, ?, ?)
        `;

        const values = [
            id_cliente,
            id_vehiculo,
            mensaje
        ];

        const [resultado] = await pool.promise().query(sql, values);
        res.status(201).json({ status: 201, message: 'Consulta creada exitosamente', data: { id_consulta: resultado.insertId, ...req.body } });
    } catch (error) {
        console.error('Error al crear consulta:', error);
        res.status(500).json({ status: 500, message: 'Error al crear la consulta' });
    }
});

// Obtener todas las consultas
router.get('/consultas', authMiddleware, async (req, res) => {
  try {
    const [resultados] = await pool.promise().query('SELECT * FROM consultas');
    res.status(200).json({ status: 200, message: 'Consultas obtenidas correctamente', data: resultados });
  } catch (error) {
    console.error('Error al obtener consultas:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener las consultas' });
  }
});

// Obtener una consulta por su ID
router.get('/consultas/:id_consulta', authMiddleware, async (req, res) => {
  const { id_consulta } = req.params;
  try {
    const [resultados] = await pool.promise().query('SELECT * FROM consultas WHERE id_consulta = ?', [id_consulta]);
    if (resultados.length === 0) {
      return res.status(404).json({ status: 404, message: 'Consulta no encontrada' });
    }
    res.status(200).json({ status: 200, message: 'Consulta obtenida correctamente', data: resultados[0] });
  } catch (error) {
    console.error('Error al obtener la consulta:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener la consulta' });
  }
});

// Actualizar una consulta por su ID
router.put('/consultas/:id_consulta', authMiddleware, async (req, res) => {
  const { id_consulta } = req.params;
  const { id_cliente, id_vehiculo, mensaje } = req.body;

  if (!id_cliente || !id_vehiculo || !mensaje) {
    return res.status(400).json({ status: 400, message: 'Faltan campos requeridos' });
  }

  try {
    const [resultado] = await pool.promise().query('UPDATE consultas SET id_cliente = ?, id_vehiculo = ?, mensaje = ? WHERE id_consulta = ?', [id_cliente, id_vehiculo, mensaje, id_consulta]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: 'Consulta no encontrada' });
    }
    res.status(200).json({ status: 200, message: 'Consulta actualizada correctamente', data: { id_consulta, ...req.body } });
  } catch (error) {
    console.error('Error al actualizar la consulta:', error);
    res.status(500).json({ status: 500, message: 'Error al actualizar la consulta' });
  }
});

// Eliminar una consulta por su ID
router.delete('/consultas/:id_consulta', authMiddleware, async (req, res) => {
  const { id_consulta } = req.params;
  try {
    const [resultado] = await pool.promise().query('DELETE FROM consultas WHERE id_consulta = ?', [id_consulta]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: 'Consulta no encontrada' });
    }
    res.status(200).json({ status: 200, message: 'Consulta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la consulta:', error);
    res.status(500).json({ status: 500, message: 'Error al eliminar la consulta' });
  }
});

// Obtener consultas por cliente
router.get('/consultas/cliente/:id_cliente', authMiddleware, async (req, res) => {
    const { id_cliente } = req.params;
    try {
        const [resultados] = await pool.promise().query('SELECT * FROM consultas WHERE id_cliente = ?', [id_cliente]);
        res.status(200).json({ status: 200, message: 'Consultas obtenidas correctamente', data: resultados });
    } catch (error) {
        console.error('Error al obtener consultas por cliente:', error);
        res.status(500).json({ status: 500, message: 'Error al obtener las consultas' });
    }
});

module.exports = router;