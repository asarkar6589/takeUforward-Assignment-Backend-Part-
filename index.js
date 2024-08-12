const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const BannerRouter = require('./routes/banner');
const mysql = require('mysql2/promise.js');


dotenv.config({
    path: ".env",
})

const mySqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use("/api/v1", BannerRouter);

// select 1 is used for starting the mysql server.
mySqlPool.query('select 1').then(() => {
    console.log("Database connection established");

    app.listen(PORT, () => {
        console.log(`Server is working on port ${PORT}`);
    })
}).catch(err => {
    console.log(err);
    console.error("Failed to establish database connection:");
    console.error(`Error Code: ${err.code}`);
    console.error(`Error Message: ${err.message}`);
    console.error(`Error Stack: ${err.stack}`);
})
