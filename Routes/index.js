let router = require('express').Router();

let clientes = require('./clientes')

let productos = require('');
let contactos=require('./contactos'))
router.use('/contactos',contactos)
router.use('/productos', productos);

router.get('/', (req, res) => {
    res.status(200).json({ tipo: 200, msg: 'conectando a API' })
});

module.export = router