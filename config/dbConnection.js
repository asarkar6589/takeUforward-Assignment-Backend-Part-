const mysql = require('mysql2/promise.js');

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'takeuforward_assignment'
});

module.exports = mySqlPool;