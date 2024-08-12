require('dotenv').config();
const mysql = require('mysql2');

const mySqlPool = mysql.createPool({
    uri: process.env.DB_URI
});

mySqlPool.getConnection((err, conn) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Database Connected successfully")
    }
})

module.exports = mySqlPool.promise();
