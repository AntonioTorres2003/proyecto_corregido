const router = require("express").Router();


router.get('/', (req, res) => {
    let respuesta = { tipo: 20, msg: 'listado headde todos los clientes' }
    res.json(respuesta);
});

router.get('/:idUsers', (req, res) => {
    console.log(req.params.idUsers);
    let respuesta = { tipo: 20, msg: 'Buscando un solo cliente' }
    res.json(respuesta);
});

router.post('/', (req, res) => {
    console.log(req.body)
    let respuesta = { tipo: 220, msg: 'resultado del post' };
    res.json(respuesta);
});

module.exports = router