const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { Users } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((users, done) => {
    done(null, users.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findOne({
      where: { id },
      include: [{
        model: Users,
        attributes: ['id', 'username'],

      }, {
        model: Users,
        attributes: ['id', 'username'],
      }],
    })
      .then(users => done(null, users))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
