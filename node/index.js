const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'fullcycle'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Eder')`
connection.query(sql)
connection.end()

const query = 'SELECT * FROM people'


app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>')
    connection.query(query, (error, results, fields) => {
        res.send(results)
    }
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})