import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'
import routes from './routes/';
import CONSTANT from './constants'

const app = express();

mongoose.connect(CONSTANT.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true });

// allow ing CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

export default app;
