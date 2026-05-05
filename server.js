const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 CONEXIÓN POSTGRESQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_ventas',
    password: '123456', // ⚠️ pon tu contraseña real
    port: 5432
});

// PROBAR CONEXIÓN
pool.connect()
.then(() => console.log('Conectado a PostgreSQL'))
.catch(err => console.log('Error conexión:', err));

// 🔥 ENDPOINT PRODUCTOS
app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        res.json(error);
    }
});

// 🔥 ENDPOINT CLIENTES
app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        res.json(result.rows);
    } catch (error) {
        res.json(error);
    }
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});