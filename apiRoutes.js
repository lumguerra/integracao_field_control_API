const express = require('express');
const router = express.Router();
const fieldController = require('./controllers/Field.controller');

router.get('/teste/:codigo', async (req, res) => {
    const codigoContato = req.params.codigo;
 
    fieldController.getOrders(codigoContato).then((data) => {
        // RESULTADO LA DA FIELD VEM EM DATA
        // VARIAVEL CHAMANDO A FUNÇÂO PARSE
        const idArray = fieldController.parseOrders(data);
        console.log(idArray);
        const result = fieldController.getForms(idArray[0]).then((data) => {

            res.json(data);
        })

      /*   res.json(idArray); */
    }).catch((error) => {
        res.status(500).json(error);
    })
});

module.exports = router;