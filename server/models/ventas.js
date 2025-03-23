const pool = require('../config/db');

const Venta = {
  // Obtener todas las ventas
  obtenerTodas: (callback) => {
    const sql = 'SELECT * FROM ventas';
    pool.query(sql, callback);
  },

  // Obtener una venta por su ID
  obtenerPorId: (id_venta, callback) => {
    const sql = 'SELECT * FROM ventas WHERE id_venta = ?';
    pool.query(sql, [id_venta], callback);
  },

  // Crear una nueva venta
  crear: (venta, callback) => {
    const impuestos = (venta.precio_final * 0.15).toFixed(2);
    const total = (parseFloat(venta.precio_final) + parseFloat(impuestos)).toFixed(2);

    const sql = `
      INSERT INTO ventas (id_vehiculo, id_cliente, id_vendedor, precio_final, impuestos, total)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      venta.id_vehiculo,
      venta.id_cliente,
      venta.id_vendedor,
      venta.precio_final,
      impuestos,
      total
    ];

    pool.query(sql, values, callback);
  },

  // Actualizar una venta existente
  actualizar: (venta, callback) => {
    const impuestos = (venta.precio_final * 0.15).toFixed(2);
    const total = (parseFloat(venta.precio_final) + parseFloat(impuestos)).toFixed(2);

    const sql = `
      UPDATE ventas 
      SET id_vehiculo = ?, id_cliente = ?, id_vendedor = ?, precio_final = ?, impuestos = ?, total = ?
      WHERE id_venta = ?
    `;

    const values = [
      venta.id_vehiculo,
      venta.id_cliente,
      venta.id_vendedor,
      venta.precio_final,
      impuestos,
      total,
      venta.id_venta
    ];

    pool.query(sql, values, callback);
  },

  // Eliminar una venta por ID
  eliminar: (id_venta, callback) => {
    const sql = 'DELETE FROM ventas WHERE id_venta = ?';
    pool.query(sql, [id_venta], callback);
  }
};

module.exports = Venta;
