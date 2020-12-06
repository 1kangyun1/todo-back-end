var express = require('express');
const { Pool } = require('pg');

import {v4 as uuidv4} from 'uuid';

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
    const result = await client.query('INSERT INTO todos(id, todo, finished) VALUES ($1, $2, $3) RETURNING *;', 
                                          [uuidv4(), req.body.todo, req.body.finished]);
    res.json( result.rows );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
