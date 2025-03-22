const express = require('express')
const router = express.Router()
const pool = require('../config/db')
const authMiddleware = require('../middleware/authMiddleware')


// obtener los datos de los clientes almacenados
app.get('/api/clientes',authMiddleware, (req, res)=>{
    const sql ='select * from clientes'
    pool.query(sql, (err, results)=>{
        if(err){throw err}
        res.json(results)
    })
})

// Filtar cliente por id
router.get('/api/clientes/:id_cliente', authMiddleware, (req, res) => {
    const {id_cliente}= req.params;
    if (!id_vehiculo) {
        return res.status(403).json({ status: 403, message: 'El id_vehiculo es un parámetro requerido...' });
    }

    const sql = "SELECT * FROM vehiculos WHERE id_vehiculo = ?";
    pool.query(sql, [id_vehiculo], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, message: 'Error al obtener el registro...' });
        }

        res.status(200).json({ status: 200, message: 'Success', results });
    });
});
// crear un nuevo cliente
router.post('/api/clientes',authMiddleware, (req,res)=>{
    const {nombre, correo, telefono } = req.body
        if(!nombre || !correo || !telefono){
          return res.status(400).json({status:400, message: 'Todos los campos son obligatorios'})
        }

        const sql = 'insert into clientes(nombre, correo, telefono) values(?,?,?)'

        pool.query(sql,[nombre, correo, telefono], (err, results)=>{
            if(err){
                console.error('Error al insertar en la base de datos')
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.status(400).json({status:400, message:'El correo ya esta registrado'})
                }
                return res.status(500).json({status:500, message:'Error al registrar cliente'})
            }
            res.status(201).json({status:201, message:'Success', results})
        })
})

// actualizar cliente por id
router.put('/api/clientes/:id_cliente',authMiddleware, (req, res)=>{
    const {id_cliente} = req.params
    const {nombre, correo, telefono}= req.body

    if(!nombre || !correo || !telefono){
        return res.status(400).json({status:400, message: 'Todos los campos son obligatorios'})
      }

      const sql = 'update clientes set nombre = ?, correo = ?, telefono = ? where id_cliente = ? '

      pool. query(sql, [nombre, correo, telefono], (err, results)=>{
            if(err){
               return res.status(500).json({status:500, message:'Error al actualizar cliente'})
            }

            if(results.affectedRows === 0){
                return res.status(404).json({status:404, message:'No se encontro el cliente'})
            }
            return res.status(200).json({status:200, message:'Success'})
      })

})

// Eliminar cliente por id
router.delete('/api/routers/:id_cliente',authMiddleware, (req, res)=>{
    const {id_cliente} = req.params

    const sql = 'delete from clientes where id_cliente = ?'

    pool.query(sql, [id_cliente], (err, results)=>{
        if(err){
            return res.status(500).json({status:500, message:'Error al eliminar cliente'})
        }

        if(results.affectedRows === 0){
            return res.status(404).json({status:404, message:'No se encontro el cliente'})
        }

        res.status(200).json({status:200, message:'Success'})

    })
})

module.exports = router
