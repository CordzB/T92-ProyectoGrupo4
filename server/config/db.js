const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306 // Asegúrate de que el puerto sea correcto
});

pool.getConnection((error, connection) => {
    if (error) {
        console.error("Error de conexión:", error);
    } else {
        console.log("Conexión exitosa....");
        connection.release(); // Libera la conexión
    }
});

module.exports = pool;