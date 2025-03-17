// configurar las propiedades de la conexión a la base de datos
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'AutoloteDB', // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.log('Error de conexión....');
  } else {
    console.log('Conexión exitosa a AutoloteDB....');
    connection.release(); // Liberar la conexión
  }
});

module.exports = pool.promise(); // Usar promesas para manejar consultas asíncronas