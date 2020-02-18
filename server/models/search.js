const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const Search = sequelize.define('search', {  
// module.exports = (sequelize, DataTypes) => (
//     sequelize.define('search', {
      title: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
    }, {
        
      timestamps: true,
      paranoid: true,
    });
//   return search;
    module.exports = Search;