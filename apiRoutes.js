const express = require('express');
const router = express.Router();

//IMPORTEI O CONTROLLER
const fieldController = require('./controllers/Field.controller');

router.get('/teste/:codigo', async (req, res) => {
    const codigoContato = req.params.codigo;
    // const user = await app.forms(codigoContato);
    // AQUI NAO FUNCIONA AWAIT ASYNC, MUDAREI PARA ESTILO PROMISES JS
    fieldController.getOrders(codigoContato).then((data) => {
        // RESULTADO LA DA FIELD VEM EM DATA
        res.json(data);
    }).catch((error) => {
        res.status(500).json(error);
    })
});

module.exports = router;