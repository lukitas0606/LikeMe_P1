const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config()

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    allowExitOnIdle: true
})

const getPost = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3) RETURNING *"
    const values = [ titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log(result)
    return result
}

const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts")
        console.log(rows)
        return rows
    } catch (error) {
        console.error('Error al obtener los registros:', error)
        throw error
    }
}

module.exports = { getPost, obtenerPost }
