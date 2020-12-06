var express = require('express');
const { Pool } = require('pg');
const { uuid } = require('uuidv4');

var router = express.Router();

router.post('/', async(req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    const result = await client.query('INSERT INTO todos VALUES (?, ?, ?) RETURNING *;', 
                                          [uuid(), req.body.todo, req.body.completed]);
    res.json( result.rows );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
