const express = require('express');
const router = express.Router();
const fieldController = require('./controllers/Field.controller');

router.get('/teste/:codigo', async (req, res) => {
    const codigoContato = req.params.codigo;
    fieldController.handleFieldApis(codigoContato).then(response =>{
        res.json(response)
    }).catch(err =>{
        res.json(err)
    })
});

module.exports = router;