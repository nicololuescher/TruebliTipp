const router = require('express').Router();
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');


router.get('/getPairingsForWine', (req, res) => {
    makeGeminiRequest(config.gemini.getPairingsForWine, JSON.stringify(req.body)).then((result) => {
        res.send(result.replace(", ", ",").replace(" ", "_"));
    });
});

module.exports = router;