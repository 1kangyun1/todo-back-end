var express = require('express');
const { Pool } = require('pg');

var router = express.Router();

router.post('/:id', async(req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    result = await client.query('SELECT * FROM todos WHERE id = $1;', [req.params.id]);
    result = await client.query('UPDATE todos SET finished = $1 WHERE id = $2 RETURNING *;', [!result.rows[0].finished, req.params.id]);
    
    res.json( result.rows );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

router.get('/', async(req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM todos ORDER BY time_created;');
    res.json( result.rows );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
