var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

router.get('/firstChart/:serverName', function(req, res, next) {
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

    const serverName = req.params.serverName;
    client.connect();

    const sql = "SELECT time FROM "+ serverName +";";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});

router.get('/secondChart/:serverName', function(req, res, next) {
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
    const serverName = req.params.serverName;

    const sql = "SELECT function FROM "+ serverName +";";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});

router.get('/thirdChart/:serverName', function(req, res, next) {
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
    const serverName = req.params.serverName;
    
    const sql = "SELECT commu_type, success FROM "+ serverName +";";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});

module.exports = router;