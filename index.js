const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const BannerRouter = require('./routes/banner');
// const mySqlPool = require('./config/dbConnection');
const mysql = require('mysql2/promise.js');

// deploy this, delete the file in the config folder and submit it.

dotenv.config({
    path: ".env",
})

const mySqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
})
