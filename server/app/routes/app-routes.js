// appRoutes.js
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('pippo');
});

module.exports = router;