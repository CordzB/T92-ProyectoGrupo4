const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Obtener todas las ventas
router.get('/ventas', ventasController.obtenerVentas);

// Obtener una venta por ID
router.get('/ventas/:id_venta', ventasController.obtenerVentaPorId);

// Crear una nueva venta
router.post('/ventas', ventasController.crearVenta);

// Actualizar una venta
router.put('/ventas', ventasController.actualizarVenta);

// Eliminar una venta por ID
router.delete('/ventas/:id_venta', ventasController.eliminarVenta);

module.exports = router;
