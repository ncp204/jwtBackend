require("dotenv").config();
import bodyParser from "body-parser";
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connection from "./config/connectDB";
import JWTAction from './middleware/JWTAction'

const app = express();

const PORT = process.env.PORT || 8083;

// Add header berfore the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested, content-type');

    // Set to true if you need the webste to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credetials', true);

    // Pass to next layer of middleware
    next();
});

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// init web route
initWebRoutes(app);

// test connection db
connection.testConnection();

// JWTAction.createJWT();

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port: ", PORT);
})