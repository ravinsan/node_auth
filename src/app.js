import express from 'express';
import Route from './route/user.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', Route);


export default app;