const express = require('express');
const router = express.Router();

// exemplo de rota
router.get('/', (req, res) => {
    res.json({ message: 'Rota de localizações funcionando!' });
});

module.exports = router;
