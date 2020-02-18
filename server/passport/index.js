const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const user = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    user.findOne({
      where: { id },
      include: [{
        model: user,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: user,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
