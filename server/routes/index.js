const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const User = require('../models/user');
const Spa = require('../models/spa');
// const passport = require('passport'), 
// LocalStrategy = require('passport-local').Strategy; 


/* GET profile(sns) Sign In */
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {
    title: '내 정보 - EverMonitor',
    user: req.user,
  });
});


/* GET Sign up page */ 
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { 
    title: 'Sign Up',
    user: req.user,
    joinError: req.flash('joinError'),
     });
});


router.get('/', (req, res, next) => {
  Spa.findAll({
    include: {
      model: User,
      attributes: ['id', 'email'],
    }})
    .then((Spas) => {
      res.render('main', {
        title: 'NodeBird',
        twits: Spas,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});


/*
router.get('/', function(req, res) {
  user.findAll()
  .then(function(users) {
    res.render('index', {
      title: 'EverMonitor',
      users: users,
      loginError: req.flash('loginError')
    });
  });
});
*/
module.exports = router;


