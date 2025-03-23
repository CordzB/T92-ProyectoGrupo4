const Venta = require('../models/ventas');

// Obtener todas las ventas
const obtenerVentas = (req, res) => {
  Venta.obtenerTodas((err, resultados) => {
    if (err) {
      console.error('Error al obtener las ventas:', err);
      return res.status(500).json({ status: 500, message: 'Error al obtener las ventas' });
    }

    res.status(200).json({ status: 200, message: 'Ventas obtenidas correctamente', data: resultados });
  });
};

// Obtener una venta por su ID
const obtenerVentaPorId = (req, res) => {
  const { id_venta } = req.params;

  Venta.obtenerPorId(id_venta, (err, resultados) => {
    if (err) {
      console.error('Error al obtener la venta:', err);
      return res.status(500).json({ status: 500, message: 'Error al obtener la venta' });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ status: 404, message: 'Venta no encontrada' });
    }

    res.status(200).json({ status: 200, message: 'Venta encontrada', data: resultados[0] });
  });
};

// Crear una nueva venta
const crearVenta = (req, res) => {
  const venta = req.body;

  // Validaciones básicas
  if (!venta.id_vehiculo || !venta.id_cliente || !venta.id_vendedor || !venta.precio_final) {
    return res.status(400).json({ status: 400, message: 'Faltan campos requeridos' });
  }

  Venta.crear(venta, (err, resultado) => {
    if (err) {
      console.error('Error al crear la venta:', err);
      return res.status(500).json({ status: 500, message: 'Error al crear la venta' });
    }

    venta.id_venta = resultado.insertId;
    res.status(201).json({ status: 201, message: 'Venta creada exitosamente', data: venta });
  });
};

// Actualizar una venta
const actualizarVenta = (req, res) => {
  const venta = req.body;

  if (!venta.id_venta || !venta.id_vehiculo || !venta.id_cliente || !venta.id_vendedor || !venta.precio_final) {
    return res.status(400).json({ status: 400, message: 'Todos los campos son requeridos para actualizar' });
  }

  Venta.actualizar(venta, (err, resultado) => {
    if (err) {
      console.error('Error al actualizar la venta:', err);
      return res.status(500).json({ status: 500, message: 'Error al actualizar la venta' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: 'Venta no encontrada' });
    }

    res.status(200).json({ status: 200, message: 'Venta actualizada correctamente', data: venta });
  });
};

// Eliminar una venta por ID
const eliminarVenta = (req, res) => {
  const { id_venta } = req.params;

  Venta.eliminar(id_venta, (err, resultado) => {
    if (err) {
      console.error('Error al eliminar la venta:', err);
      return res.status(500).json({ status: 500, message: 'Error al eliminar la venta' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: 'Venta no encontrada' });
    }

    res.status(200).json({ status: 200, message: 'Venta eliminada correctamente' });
  });
};

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta
};
