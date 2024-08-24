const router = require('express').Router();
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');

// get pairings for a given wine
// post is needed so body can be used as input. JS spec doesn't allow this with GET 
router.post('/getPairingsForWine', (req, res) => {
    makeGeminiRequest(config.gemini.getPairingsForWine, JSON.stringify(req.body)).then((result) => {
        res.send(result);
    });
});

module.exports = router;