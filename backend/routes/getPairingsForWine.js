const router = require('express').Router();
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');

// get pairings for a given wine
router.post('/getPairingsForWine', (req, res) => {
    makeGeminiRequest(config.gemini.getPairingsForWine, JSON.stringify(req.body)).then((result) => {
        res.send(result);
    });
});

module.exports = router;