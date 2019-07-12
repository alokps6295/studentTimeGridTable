import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from './morgan';
import routes from '../routes/index';

export default () => {

    const app = express();
    app.use(cors());
    /*  app.use(morgan()); */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', routes); // all routes included        
    return app;
}