let mysql = require('../DB/Mysql');
module.exports = {
    crear: (req, res) => {
        mysql.query('insert into contacto set?', req.body, (error, results, fields) => {
            if (error)
                console.log(error)
            else {
                res.json({ msg: 'greegdo correctamente' })
            }

        })
    },
    listar: (req, res) => {
        mysql.query('select*from contacto', (error, results, fields) => {
            if (error)
                res.json(error)
            else {
                res.json({ msg: 'agregado correctamente' })
            }

        })
    },
    buscar: (req, res) => {
        mysql.query('select*from contacto where id=?', req.params.idCto, (error, results, fields) => {
            if (error)
                console.log(error)
            else {
                res.json(results)

            }

        })
    },
    borrar: (req, res) => {
        mysql.query('delete*from contacto where id=?', req.params.idCto, (error, results, fields) => {
            if (error)
                console.log(error)
            else {
                let respuesta = (
                    tipo = 200,
                    msg = 'se eliminó correctamente'
                )
                res.json(respuesta)


            }

        })
    },
};