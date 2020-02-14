const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Users } = require('../models');

const router = express.Router();

router.post('/register', isNotLoggedIn, async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const exUser = await Users.findOne({ where: { email } });
    if (exUser) {
      req.flash('registerError', '이미 가입된 이메일입니다.');
      return res.redirect('/register');
    }
    const hash = await bcrypt.hash(password, 12);
    await Users.create({
      email,
      username,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, users, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!users) {
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    return req.login(users, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;