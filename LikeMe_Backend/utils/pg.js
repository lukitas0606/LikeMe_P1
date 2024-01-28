const dotenv = require('dotenv');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    allowExitOnIdle: true
});

const getPost = async (titulo, img, descripcion) => {
    const postId = uuidv4();
    const consulta = "INSERT INTO posts VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [postId, titulo, img, descripcion, null];

    try {
        const result = await pool.query(consulta, values);
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al insertar el post:', error);
        throw error;
    }
};

const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts");
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        throw error;
    }
};

module.exports = { getPost, obtenerPost };
