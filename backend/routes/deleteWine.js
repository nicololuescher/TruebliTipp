const router = require('express').Router();
const Pool = require('pg').Pool;

const config = require('../config');

const pool = new Pool(config.pool);

// delete a wine from the inventory
router.delete('/deleteWine', (req, res) => {
  const { id } = req.body;
  pool.query('DELETE FROM wines WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Wine deleted with ID: ${id}`);
  });
});

module.exports = router;
