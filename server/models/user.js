const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true,
    underscored: true
});

module.exports = User;