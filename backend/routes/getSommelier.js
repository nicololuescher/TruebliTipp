const router = require('express').Router();
const sommelierAPI = require('../res/sommelier');

// sommelier questionaire
router.get('/getSommelier', (req, res) => {
    step = req.query.step;

    if (step === undefined) {
        step = 'start';
    }

    if (sommelierAPI[step].options) {
        return res.json(sommelierAPI[step]);
    }

    if (sommelierAPI[step].recommendation) {
        return res.json(sommelierAPI[step]);
    }
    
    return res.json({ error: 'Invalid step' });
});

module.exports = router;