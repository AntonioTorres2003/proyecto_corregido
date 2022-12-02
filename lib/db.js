const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'proyecto_programacion_web',
    password: ''
});

connection.connect();
module.exports = connection;