import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/base-error';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'На сервере произошла ошибка',
  });
};

export default errorHandler;
