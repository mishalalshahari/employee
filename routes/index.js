var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.send({
    name: 'mishal',
    age: 18
  });
});

module.exports = router;