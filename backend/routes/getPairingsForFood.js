const router = require('express').Router();
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');

// get a ranked list of wine pairings for a given food
// post is needed so body can be used as input. JS spec doesn't allow this with GET 
router.post('/getPairingsForFood', (req, res) => {
    makeGeminiRequest(config.gemini.getPairingsForFood, JSON.stringify(req.body)).then((result) => {
        res.send(result);
    });
});

module.exports = router;