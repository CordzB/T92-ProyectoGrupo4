const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Rutas ventas
router.get('/ventas', ventasController.obtenerVentas);
router.get('/ventas/:id_venta', ventasController.obtenerVentaPorId);
router.post('/ventas', ventasController.crearVenta);
router.put('/ventas', ventasController.actualizarVenta);
router.delete('/ventas/:id_venta', ventasController.eliminarVenta);

module.exports = router;
