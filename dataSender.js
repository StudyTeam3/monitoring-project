const data = require('./parse.json');
const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
  });

    function insertQueries (row) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO spa VALUES(' + 
        `'` + row.time + `',` +
        `'` + row.log_level + `',` +
        `'` + row.server_range + `',` +
        `'` + row.server_name + `',` +
        `'` + row.service_name + `',` +
        `'` + row.message_id + `',` +
        `'` + row.protocol + `',` +
        `'` + row.http_method + `',` +
        `'` + row.uri + `',` +
        `'` + row.source + `',` +
        `'` + row.destination + `',` +
        `'` + row.commu_type + `',` +
        `'` + JSON.stringify(row.contents) + `',` +
        row.success + ',' +
        `'` + row.car_id + `',` +
        `'` + row.function + `'` +
        ');';

        pool.query(query)
        .then((err,res) => {
            // pool.end();
            if(res === undefined) reject(err);
            resolve(res);
        })
        .catch((error) => {
            console.log(error);
        });
    });

}

data.forEach(row => {
    insertQueries(row)
    .then(res => {
        if(res === undefined) reject(err);
        resolve(res);
    }).catch((error) => {
        console.log(error);
    });
});