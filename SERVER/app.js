
import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import gifRoutes from './routes/gif_route';
import userRoutes from './routes/user_route';
import articleRoutes from './routes/article_route';
import flagRoutes from './routes/flag_route';
import swaggerDoc from '../swaggerDoc';
import cor from './usingDB/middleware/cors';
import cors from 'cors';

const app = express();
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cor);
app.use('/', userRoutes);
app.use('/', gifRoutes);
app.use('/', articleRoutes);
app.use('/', flagRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;
