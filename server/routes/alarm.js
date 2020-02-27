var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

router.get('/', function(req, res, next) {
    var returnRes = [];
    let temp = new Object();

    const { Client } = require('pg');

    const client = new Client({
        user : config.username,
        host : 'localhost',
        database : 'postgres',
        password : config.password,
        port : 5432,
    });

    client.connect();
    const sql = "SELECT time, message_id, success, commu_type FROM spa;";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});

module.exports = router;