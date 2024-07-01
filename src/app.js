import express from 'express';
import Route from './route/user.route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use('/api', Route);


export default app;