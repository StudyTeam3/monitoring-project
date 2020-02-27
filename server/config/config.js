const security = require('../config/security.json')

module.exports = {
    "development": {
        "username": security.username,
        "password": security.password,
        "database": "postgres",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "operatorsAliases": false,
        "cors" : true,
    },
    "test": {
        "username": security.username,
        "password": security.password,
        "database": "postgres",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "operatorsAliases": false,
        "cors" : true,
    },
    "production": {
        "username": security.username,
        "password": security.password,
        "database": "postgres",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "operatorsAliases": false,
        "cors" : false,
    }
};  