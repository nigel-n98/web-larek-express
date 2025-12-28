import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { errors as celebrateErrors } from 'celebrate';

import productRouter from './routes/product';
import orderRouter from './routes/order';

import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';

import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(celebrateErrors());

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);

app.use(errorHandler);

mongoose
  .connect('mongodb://127.0.0.1:27017/weblarek')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
