const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;


const User = sequelize.define('user', {
  // module.exports = (sequelize, DataTypes) => (
    // sequelize.define('user', {   
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
   },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Spa);
        }
      },
      timestamps: true,
      paranoid: true,
});


  // return user;
module.exports = User;