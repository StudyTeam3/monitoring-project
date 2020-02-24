var express = require('express');
var router = express.Router();

router.get('/firstChart', function(req, res, next) {
    var returnRes = [];
    let temp = new Object();

    const { Client } = require('pg');

    const client = new Client({
        user : 'postgres',
        host : 'localhost',
        database : 'postgres',
        password : 'password',
        port : 5432,
    });

    client.connect();
    const sql = "SELECT time FROM spa;";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});


router.get('/secondChart', function(req, res, next) {
    var returnRes = [];
    let temp = new Object();

    const { Client } = require('pg');

    const client = new Client({
        user : 'postgres',
        host : 'localhost',
        database : 'postgres',
        password : 'apmsetup',
        port : 5432,
    });

    client.connect();
    const sql = "SELECT function FROM spa;";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});

router.get('/thirdChart', function(req, res, next) {
    var returnRes = [];
    let temp = new Object();

    const { Client } = require('pg');

    const client = new Client({
        user : 'postgres',
        host : 'localhost',
        database : 'postgres',
        password : 'apmsetup',
        port : 5432,
    });

    client.connect();
    const sql = "SELECT commu_type, success FROM spa;";

    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});
module.exports = router;