var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM todos');
    const results = { 'results': (result) ? result.rows : null};
    res.json( results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
