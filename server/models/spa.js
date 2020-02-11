const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const Spa = sequelize.define('spa', {
    time: {
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    },
    log_level: {
        type: Sequelize.STRING,
    },
    server_range: {
        type: Sequelize.STRING,
    },
    server_name: {
        type: Sequelize.STRING,
    },
    service_name: {
        type: Sequelize.STRING,
    },
    message_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    protocol: {
        type: Sequelize.STRING,
    },
    http_method: {
        type: Sequelize.STRING,
    },
    uri: {
        type: Sequelize.STRING,
    },
    source: {
        type: Sequelize.STRING,
    },
    destination: {
        type: Sequelize.STRING,
    },
    commu_type: {
        type: Sequelize.STRING,
    },
    contents: {
        type: Sequelize.TEXT,
    },
    success: {
        type: Sequelize.BOOLEAN,
    },
    function: {
        type: Sequelize.STRING,
    },
    car_id: {
        type: Sequelize.STRING,
    },
});

module.exports = Spa;