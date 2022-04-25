import express from 'express';
import logger from './libs/logger';
import connectMongo from './libs/connect_mongo';
import './libs/config';

const app = express();

// Connect to MongoDB
connectMongo();

// Body Parser

// Router

app.listen(process.env.PORT, () => {
  logger.info(`Server is running at port ${process.env.PORT}`);
});
