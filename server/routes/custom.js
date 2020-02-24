var express = require('express');
var router = express.Router();

function sendRes(response, returnRes){
    response.json(returnRes);
}

const { Client } = require('pg');

router.post('/', (req, res, next) => {
    var returnRes = [];

    const client = new Client({
        user : 'postgres',
        host : 'localhost',
        database : 'postgres',
        password : 'duddn311',
        port : 5432,
    });

    client.connect();
    var user_id = req.body.params;
    const sql = `SELECT custom_col FROM custom WHERE "user_id" = ${user_id}`;
    
    client.query(sql)
    .then((result)=>{
        console.log(result.rows);
        res.status(200).json(result.rows[0].custom_col);
    })
    .then(()=>client.end())
    .catch(e => console.error(e));
});




module.exports = router;