const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Rota de favoritos funcionando!' });
});

module.exports = router;
