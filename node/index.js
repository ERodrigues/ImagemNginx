const express = require('express')
const app = express()
var path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
var router = express.Router()


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
    if (err) throw err;
    console.log("Connected!");
});

const create_table = 'create table if not exists people (id int auto_increment primary key, name varchar(255))'
connection.query(create_table, function(err, result) {
    if (err) throw err
    console.log("Tabela criada")
})

const insert_query = `INSERT INTO people(name) values('Eder')`
connection.query(insert_query, function(err, result) {
    if (err) throw err
    console.log("Insert realizado")
})

const query = 'SELECT name FROM people'


app.get('/',  (req,res) => {
    connection.query(query, (err, result) => {
        if (err) {
            req.flash('error', err)
        }
        
        res.render('index', {data: result})
    })
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

module.exports = router