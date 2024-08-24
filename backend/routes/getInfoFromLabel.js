const router = require('express').Router();
const { extractTextFromImage } = require('../helpers/visionAdapter');
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');

router.post('/getInfoFromLabel', (req, res) => {
    extractTextFromImage(req.body.image).then((image) => {
        makeGeminiRequest(config.gemini.getInfoFromLabel, image).then((result) => {
            res.send(result);
        });
    });
});

module.exports = router;