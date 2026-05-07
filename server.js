const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // ⚠️ tu contraseña si tienes
    database: 'sistema_ventas'
});


db.connect((err) => {

    if(err){
        console.log('Error conexión:', err);
    }else{
        console.log('Conectado a MySQL');
    }

});


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



app.listen(3000, () => {

    console.log(
        'Servidor ejecutándose en puerto 3000'
    );

});
