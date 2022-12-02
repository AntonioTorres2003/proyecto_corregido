const mysql = requier('.../node_modules/mysql');
const mysqlConection = mysql.createConection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'proyectos_programación_web'
});
mysqlConection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('DB is connected');
    }
});
module.exports = mysqlConnection;