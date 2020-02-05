var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data',(req,res)=>{
  const data = {
      lastname : "3",
      firstname : "team"
  };
  res.json(data);
})

module.exports = router;
