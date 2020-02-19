var express = require('express');
var router = express.Router();

function sendRes(response, returnRes){
    response.json(returnRes);
}

router.get('/', function(req, res, next) {
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
    const sql = "SELECT * FROM spa;";

    client.query(sql)
    .then((res)=>{
        for(var i = 0; i < Object.keys(res.rows).length; i++){
            temp = new Object();
            temp.title = res.rows[i].time;
            temp.id = res.rows[i].message_id;
            returnRes.push(temp);
        }
        return res;
    })
    .then(
        (response) => {
            console.log(response);
            response.json(returnRes);
        })
    .then(()=>client.end())
    .catch(e => console.error(e));

    // client.query(sql, (err, res) => {
    //     for(var i = 0; i < Object.keys(res.rows).length; i++){
    //         temp = new Object();
    //         temp.title = res.rows[i].time;
    //         temp.id = res.rows[i].message_id;
    //         returnRes.push(temp);
    //     }
    //     // res.json(returnRes);
        
    //     // sendRes(res,returnRes);
        
    // })
    // .then(response => response.json(returnRes))
    // .then(()=>client.end());

    // client.query(sql, (err, res) => {
    //     return new Promise(function (resolve, reject) {
    //         if(err){
    //             reject("실패");
    //         }
    //         for(var i = 0; i < Object.keys(res.rows).length; i++){
    //             temp = new Object();
    //             temp.title = res.rows[i].time;
    //             temp.id = res.rows[i].message_id;
    //             returnRes.push(temp);
    //         }
    //         resolve(res);
    //     }).then((response)=>{
    //         response.json(returnRes);
    //         returnRes = [];
    //         client.end();
    //     }).catch((error)=>{
    //         console.error(error);
    //         console.log(error);
    //     });;
    // });

    // setTimeout(res.json(returnRes),0100);
    // res.json([{
    //     title: "00:00:01 에러 발생",
    //     id: "asdf-asdf-1234-1234"
    // },
    // {
    //     title: "00:00:02 에러 발생",
    //     id: "asdf-asdf-1234-1234"
    // },
    // {
    //     title: "00:00:03 에러 발생",
    //     id: "asdf-asdf-1234-1234"
    // }]);
});

module.exports = router;