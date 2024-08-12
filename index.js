const dotenv = require('dotenv');

dotenv.config({
    path: ".env",
})


const express = require('express');
const cors = require('cors');
const BannerRouter = require('./routes/banner');

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

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
})