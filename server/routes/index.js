const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
/* models : user, dashboard, dashboarddetail..
const { Post or Dashboard, User } = require('../models');
*/
const router = express.Router();


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

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - EverMonitor', users: req.users });
});

router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('register', {
    title: '회원가입 - EverMonitor',
    users: req.users,
    registerError: req.flash('registerError'),
  });
});

module.exports = router;
