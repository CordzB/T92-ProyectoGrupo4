const express = require('express');
const router = express.Router();
const { convertirPrecio } = require('../services/tasasCambio');

// Ruta: GET http://localhost:3000/tipo-cambio?precio=5000&moneda=USD&base=HNL
router.get('/', async (req, res) => {
  const { precio, moneda, base } = req.query;

  // Valida 
  if (!precio || !moneda) {
    return res.status(400).json({ error: 'Faltan parámetros: precio o moneda destino' });
  }

  try {
    const resultado = await convertirPrecio(
      parseFloat(precio),
      moneda.toUpperCase(),
      (base || 'USD').toUpperCase()
    );

    res.json({
      monedaBase: base || 'USD',
      monedaDestino: moneda,
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
