const router = require('express').Router();
const { makeGeminiRequest } = require('../helpers/geminiAdapter');
const { extractTextFromImage } = require('../helpers/visionAdapter');
const config = require('../config');

// process image of a menu and return information about the wines
router.post('/postAnalyseMenu', (req, res) => {
    menus = [];
    let promises = req.body.images.map((item) => {
        return extractTextFromImage(item).then((text) => {
            return makeGeminiRequest(config.gemini.postAnalyseMenu, text).then((result) => {
                menus.push(result);
            });
        });
    });
    Promise.all(promises).then(() => {
        console.log(menus);
        res.send([].concat(...menus));
    });
});

module.exports = router;