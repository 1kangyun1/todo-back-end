var express = require('express');
var router = express.Router();

router.delete('/:id', function(req, res, next) {
  res.send(req.params.id + " is deleted");
});

module.exports = router;
