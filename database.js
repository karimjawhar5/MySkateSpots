import * as dotenv from 'dotenv'
dotenv.config()

import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

export async function getUserByEmail(email){
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return user[0];
}

export async function getUserByUsername(username){
    const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return user[0];
}

export async function createUser(name,username, email, password){
    const [result] = await pool.query('INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)', [name, username, email, password])
}
