var express = require('express');
var router = express.Router();

var ExampleSchema = require('../models/exampleSchema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  ExampleSchema.findAll()
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  })

});

module.exports = router;
