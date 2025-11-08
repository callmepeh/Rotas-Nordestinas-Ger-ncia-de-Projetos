const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Rota de usuários funcionando!' });
});

module.exports = router;
