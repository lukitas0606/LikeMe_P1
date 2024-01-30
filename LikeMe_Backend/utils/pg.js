const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    allowExitOnIdle: true
});

const getPost = async (id, titulo, img, descripcion) => {


    try {    
        const consulta = "INSERT INTO posts (id, titulo, img, descripcion) VALUES ($1, $2, $3, $4) RETURNING *;";
        const values = [id, titulo, img, descripcion];
        const { rows } = await pool.query(consulta, values);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error al insertar el post:', error);
        throw error;
    }
};

const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts;");
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        throw error;
    }
};

module.exports = { getPost, obtenerPost };
