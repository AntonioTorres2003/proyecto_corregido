const contactoController=require('../Controllers/contactoController')
let contactos=require('express').Router()
contactos.get('/', (req, res) => {
    let respuesta = { tipo: 20, msg: 'listado headde todos los clientes' }
    res.json(respuesta);
    contactoController.listar(req,res)
});

contactos.get('/:idUsers', (req, res) => {
    console.log(req.params.idCto);
    let respuesta = { tipo: 20, msg: 'Buscando un solo cliente' }
    res.json(respuesta);
});

contactos.post('/', (req, res) => {
    console.log(req.body)
    let respuesta = { tipo: 220, msg: 'resultado del post' };
    res.json(respuesta);
});

module.exports = contactos