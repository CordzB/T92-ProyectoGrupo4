const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Rutas ventas
router.get('/ventas', authMiddleware,ventasController.obtenerVentas);
router.get('/ventas/:id_venta', authMiddleware,ventasController.obtenerVentaPorId);
router.post('/ventas', authMiddleware,ventasController.crearVenta);
router.put('/ventas', authMiddleware,ventasController.actualizarVenta);
router.delete('/ventas/:id_venta',authMiddleware, ventasController.eliminarVenta);

module.exports = router;
