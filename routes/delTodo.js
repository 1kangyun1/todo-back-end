var express = require('express');
const { Pool } = require('pg');

var router = express.Router();

router.delete('/:id',  async(req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    const result = await client.query('DELETE FROM todos WHERE id = $1 RETURNING *;', [req.params.id]);
    res.json( result.rows );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
