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

connection.connect(function(err) {
    const create_table = 'create table if not exists people (id int auto_increment primary key, name varchar(255))'
    connection.query(create_table, function(erro, result) {
        if (err) throw err
        console.log("Tabela criada")
    })

    const sql = `INSERT INTO people(name) values('Eder')`
    connection.query(sql, function(erro, result) {
        if (err) throw err
        console.log("Insert realizado")
    })
})
connection.end()

const query = 'SELECT * FROM people'


app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})