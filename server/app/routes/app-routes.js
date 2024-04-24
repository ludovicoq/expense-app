// appRoutes.js
const express = require('express');
const router = express.Router();

router.get('*/test', (req, res) => {
    res.send('abcdefg');
});

module.exports = router;