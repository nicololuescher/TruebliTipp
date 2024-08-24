const router = require('express').Router();
const Pool = require('pg').Pool;

const config = require('../config');

const pool = new Pool(config.pool);

// post a new wine to the inventory
router.post('/postWine', (req, res) => {
    const { name, user_id, year, grapes, type, country, region, description, tags, price, rating } = req.body;
    pool.query('INSERT INTO wines (name, user_id, year, grapes, type, country, region, description, tags, price, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [name, user_id, year, grapes, type, country, region, description, tags, price, rating], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Wine added with ID: ${results.insertId}`);
    });
});

module.exports = router;