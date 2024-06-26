//dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('express-async-handler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectToMongo = require("./src/config/DbConfig");

const app = express();
const PORT = process.env.PORT || 4000;

const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//DB
connectToMongo();

//routers
const provinceRouter = require("./src/routers/ProvinceRouter");
const tripRouter = require("./src/routers/TripRouter");
const userRouter = require("./src/routers/UserRouter");
const busRouter = require("./src/routers/BusRouter");
const providerRouter = require("./src/routers/ProviderRouter");
const ticketRouter = require("./src/routers/TicketRouter");
const reviewRouter = require("./src/routers/ReviewRouter");
const addEmailToQueue = require('./src/services/EmailService');

//routes
app.use("/api/province", provinceRouter);
app.use("/api/trip", tripRouter);
app.use("/api/user", userRouter);
app.use("/api/bus", busRouter);
app.use("/api/provider", providerRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/review", reviewRouter);

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

// app.post('/send-email', (req, res) => {
//     const { to, subject, text } = req.body;

//     if (!to || !subject || !text) {
//         return res.status(400).send('Missing required fields');
//     }

//     addEmailToQueue(to, subject, text);
//     res.status(200).send('Email queued');
// });

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    }
    else
        console.log("Error occurred, server can't start", error);
}
); 
