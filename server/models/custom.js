const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const Custom = sequelize.define('custom', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    custom_col: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    platform: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
});

module.exports = Custom;