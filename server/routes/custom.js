var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

function sendRes(response, returnRes){
    response.json(returnRes);
}

const { Client } = require('pg');

router.post('/', (req, res, next) => {
    var returnRes = [];

    const client = new Client({
        user : config.username,
        host : 'localhost',
        database : 'postgres',
        password : config.password,
        port : 5432,
    });

    client.connect();
    var user_id = req.body.user_id;
    const sql = `SELECT custom_col FROM custom WHERE "user_id" = ${user_id}`;
    
    client.query(sql)
    .then((result)=>{
        res.status(200).json(result.rows[0].custom_col);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});

router.post('/update', (req, res, next) => {
    const client = new Client({
        user : config.username,
        host : 'localhost',
        database : 'postgres',
        password : config.password,
        port : 5432,
    });

    client.connect();
    var user_id = req.body.user_id;
    var custom_col = req.body.custom_col
    const sql = `UPDATE custom SET "custom_col"='{${custom_col}}' WHERE "user_id" = ${user_id}`;
    client.query(sql)
    .then((result)=>{
        console.log('update custom col');
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
})



module.exports = router;