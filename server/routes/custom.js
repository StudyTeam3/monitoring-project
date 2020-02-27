var express = require('express');
var router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

function sendRes(response, returnRes){
    response.json(returnRes);
}

const { Client } = require('pg');

router.post('/', (req, res, next) => {
    const client = new Client({
        user : config.username,
        host : 'localhost',
        database : 'postgres',
        password : config.password,
        port : 5432,
    });

    const client2 = new Client({
        user : config.username,
        host : 'localhost',
        database : 'postgres',
        password : config.password,
        port : 5432,
    });

    client.connect();
    client2.connect();
    const user_id = req.body.user_id;
    const platform = req.body.platform;
    const sql = `SELECT custom_col FROM custom WHERE "user_id" = '${user_id}' AND "platform" = '${platform}';`;
    
    client.query(sql)
    .then((result)=>{
        // console.log("result",result.rows);
        // CUSTOM에 없으면 새로 만든다.
        if(result.rows.length === 0) {
            const pushSql = `INSERT INTO custom VALUES('${user_id}','{start,end,message_id,http_method,status}','${platform}') RETURNING custom_col;`
            client2.query(pushSql)
            .then((newRes) => {
                console.log(newRes);
                res.status(200).json(newRes.rows[0].custom_col);
            })
            .then(() => client2.end())
        }
        else res.status(200).json(result.rows[0].custom_col);
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
    var custom_col = req.body.custom_col;
    var platform = req.body.platform;
    // console.log("platform: ",platform);
    // console.log("custom_col: ",custom_col);
    const sql = `UPDATE custom SET "custom_col"='{${custom_col}}' WHERE "user_id" = '${user_id}' AND "platform" = '${platform}';`;
    client.query(sql)
    .then((result)=>{
        console.log('update custom col');
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
})



module.exports = router;