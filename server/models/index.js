const Sequelize = require('sequelize');

/* DB 환경 설정 server/config/config.js
    - development: 개발용
    - production: 배포용
    - test: 테스트용
*/
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// db객체를 모듈화시켜서 사용
const db = {};

// config을 적용하여 인스턴스화
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Connection Test
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// db간 관계 설정 - foreignKey로 설정 가능
// db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'employee_number'});
// db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'employee_number'});

module.exports = db;