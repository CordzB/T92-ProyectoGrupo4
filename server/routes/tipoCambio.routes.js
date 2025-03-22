const express = require('express');
const router = express.Router();
const { convertirPrecio } = require('../services/tasasCambio');

//siempre convierte de USD → HNL
router.get('/', async (req, res) => {
  const { precio } = req.query;

  if (!precio) {
    return res.status(400).json({ error: 'Falta el parámetro precio' });
  }

  try {
    const resultado = await convertirPrecio(
      parseFloat(precio),
      'HNL',  // moneda Destino
      'USD'   // moneda Base
    );

    res.json({
      monedaBase: 'USD',
      monedaDestino: 'HNL',
      tasaCambio: resultado.tasa,
      precioOriginal: precio,
      precioConvertido: resultado.precioConvertido
    });
  } catch (error) {
    console.error('Error en conversión:', error.message);
    res.status(500).json({ error: 'No se pudo obtener la tasa de cambio' });
  }
});

module.exports = router;
