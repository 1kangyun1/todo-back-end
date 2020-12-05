var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.send(req.body.title + " is created");
});

module.exports = router;
