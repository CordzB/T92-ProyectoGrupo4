const pool = require('../config/db'); // Conecta a BD

const Venta = {
  obtenerTodas: (callback) => {
    const sql = 'SELECT * FROM ventas';
    pool.query(sql, callback);
  },

  obtenerPorId: (id_venta, callback) => {
    const sql = 'SELECT * FROM ventas WHERE id_venta = ?';
    pool.query(sql, [id_venta], callback);
  },

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

  eliminar: (id_venta, callback) => {
    const sql = 'DELETE FROM ventas WHERE id_venta = ?';
    pool.query(sql, [id_venta], callback);
  }
};

module.exports = Venta;
