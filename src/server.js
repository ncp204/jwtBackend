require("dotenv").config();
import bodyParser from "body-parser";
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connection from "./config/connectDB";

const app = express();

const PORT = process.env.PORT || 8083;


// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// test connection db
connection();

// init web route
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port: ", PORT);
})