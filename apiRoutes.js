const express = require('express');
const router = express.Router();
const app = require('./app');

router.get('/teste/:codigo', async (req, res) => {
    try {
        const codigoContato = req.params.codigo;
        const user = await app.forms(codigoContato);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o contato', error: error.message });
    }
});

module.exports = router;