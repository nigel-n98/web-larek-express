import BaseError from './base-error';

class InternalServerError extends BaseError {
  constructor(message = 'На сервере произошла ошибка') {
    super(message, 500);
  }
}

export default InternalServerError;
