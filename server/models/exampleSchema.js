const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const ExampleSchema = sequelize.define('example', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = ExampleSchema;