const express = require('express')
require('dotenv').config()
const mysql = require('mysql')

const app = express()
app.use(express.json())

let {
    HOST,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_NAME,
    DB_PASSWORD,
} = process.env

const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
})

connection.connect(err => {
    if (err) {
        console.log(err.message)
        return;
    }
    console.log('Connected to DB')
})

app.get('/', (req, res) => {
    res.send(`Host: ${process.env.HOST}`)
})

app.get('/user/:id', function (req, res) {
    let sql = `SELECT * FROM people WHERE id = ${req.params.id}`
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.log(result)
    })
    res.send('User information checked')
})

app.post('/user', function (req, res) {
    let sql = 'INSERT INTO people (id, name, bio) VALUES (23, "Aram", "some text...")'
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
    })
    res.send("User created successfully")
})

app.put('/user/:id', function (req, res) {
    let sql = `UPDATE people SET name = "Armen", bio = "example" WHERE id = ${req.params.id}`
    const myUser = user[req.params.id]
    if (myUser === undefined) {
        res.status(404).send('User not found')
    } else {
        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            }
        })
        res.send('User updated')
    }
})

app.delete('/user/:id', function (req, res) {
    let sql = `DELETE FROM people WHERE id = ${req.params.id}`
    connection.query(sql, (err, result)=>{
        if (err) throw err
    })
    res.send('User deleted')
})

app.listen(PORT, () => {
    console.log(`started ${HOST}:${PORT}`)
})

