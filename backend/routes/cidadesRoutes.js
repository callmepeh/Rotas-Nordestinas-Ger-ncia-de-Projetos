const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Rota de cidades funcionando!' });
});

module.exports = router;
