const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONEXIÓN MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin1234', // ⚠️ tu contraseña si tienes
    database: 'sistema_ventas'
});

// 🔥 CONECTAR
db.connect((err) => {

    if(err){
        console.log('Error conexión:', err);
    }else{
        console.log('Conectado a MySQL');
    }

});


// ==============================
// 🔥 OBTENER PRODUCTOS
// ==============================
app.get('/productos', (req, res) => {

    db.query(
        'SELECT * FROM productos',
        (err, result) => {

            if(err){
                res.json(err);
            }else{
                res.json(result);
            }

        }
    );

});


// ==============================
// 🔥 OBTENER CLIENTES
// ==============================
app.get('/clientes', (req, res) => {

    db.query(
        'SELECT * FROM clientes',
        (err, result) => {

            if(err){
                res.json(err);
            }else{
                res.json(result);
            }

        }
    );

});


// ==============================
// 🔥 INSERTAR CLIENTE
// ==============================
app.post('/clientes', (req, res) => {

    const { nombre, ci, telefono } = req.body;

    db.query(

        `INSERT INTO clientes
        (nombre, ci, telefono)
        VALUES (?, ?, ?)`,

        [nombre, ci, telefono],

        (err, result) => {

            if(err){
                res.json(err);
            }else{
                res.json({
                    mensaje: 'Cliente registrado'
                });
            }

        }

    );

});

// =====================================
// 🔥 PROCEDURE: LISTAR PRODUCTOS
// =====================================

app.get('/listar-productos', (req, res) => {

    db.query(
        'CALL listar_productos_disponibles()',

        (err, result) => {

            if(err){

                console.log(err);
                res.json(err);

            }else{

                res.json(result[0]);

            }

        }

    );

});


// =====================================
// 🔥 PROCEDURE: LISTAR VENTAS
// =====================================

app.get('/listar-ventas', (req, res) => {

    db.query(
        'CALL listar_ventas()',

        (err, result) => {

            if(err){

                console.log(err);
                res.json(err);

            }else{

                res.json(result[0]);

            }

        }

    );

});


// =====================================
// 🔥 PROCEDURE: LISTAR COMPRAS
// =====================================

app.get('/listar-compras', (req, res) => {

    db.query(
        'CALL listar_compras()',

        (err, result) => {

            if(err){

                console.log(err);
                res.json(err);

            }else{

                res.json(result[0]);

            }

        }

    );

});
// ==============================
// 🔥 SERVIDOR
// ==============================
app.listen(3000, () => {

    console.log(
        'Servidor ejecutándose en puerto 3000'
    );

});
