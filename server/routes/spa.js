var express = require('express');
var router = express.Router();
var Spa = require('../models/Spa')

/* GET SPA */
// console.log(users[0].dataValues);
router.get('/', function(req, res, next) {
  Spa.findAll()
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  })
});

module.exports = router;
