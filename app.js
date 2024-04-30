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

//routes
app.use("/api/province", provinceRouter);
app.use("/api/trips", tripRouter);
app.use("/api/user", userRouter);
app.use("/api/bus", busRouter);


app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    }
    else
        console.log("Error occurred, server can't start", error);
}
); 
