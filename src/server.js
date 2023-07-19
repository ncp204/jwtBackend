require("dotenv").config();
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

const app = express();
const PORT = process.env.PORT || 8083;

// config view engine
configViewEngine(app);

// init web route
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port: ", PORT);
})