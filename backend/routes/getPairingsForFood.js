const router = require('express').Router();
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');

router.get('/getPairingsForFood', (req, res) => {
    makeGeminiRequest(config.gemini.getPairingsForFood, JSON.stringify(req.body)).then((result) => {
        res.send(result);
    });
});

module.exports = router;