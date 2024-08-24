const router = require('express').Router();
const Pool = require('pg').Pool;

const config = require('../config');

const pool = new Pool(config.pool);

router.get('/getWines', (req, res) => {
    pool.query('SELECT * FROM wines', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

module.exports = router;