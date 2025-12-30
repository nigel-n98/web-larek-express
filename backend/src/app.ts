import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { errors as celebrateErrors } from 'celebrate';

import productRouter from './routes/product';
import orderRouter from './routes/order';

import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();

const {
  PORT = '3000',
  DB_ADDRESS,
  PUBLIC_PATH = 'public',
  ORIGIN_ALLOW,
} = process.env;

if (!DB_ADDRESS) {
  throw new Error('DB_ADDRESS is not defined');
}

const app = express();

app.use(
  cors({
    origin: ORIGIN_ALLOW,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.static(path.join(__dirname, PUBLIC_PATH)));

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(celebrateErrors());

app.use((_req, _res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(Number(PORT), () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
