const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const Vehicle = sequelize.define('vehicle', {
    time: {
        type: 'TIMESTAMP',
        allowNull: false,
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
        primaryKey: true,
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
    car_id: {
        type: Sequelize.STRING,
    },
    function: {
        type: Sequelize.STRING,
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
});

module.exports = Vehicle;