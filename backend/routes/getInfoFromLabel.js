const router = require('express').Router();
const { extractTextFromImage } = require('../helpers/visionAdapter');
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const config = require('../config');

// process image of a label and return information about the wine
// post is needed so body can be used as input. JS spec doesn't allow this with GET 
router.post('/getInfoFromLabel', (req, res) => {
    extractTextFromImage(req.body.image).then((image) => {
        makeGeminiRequest(config.gemini.getInfoFromLabel, image).then((result) => {
            res.send(result);
        });
    });
});

module.exports = router;