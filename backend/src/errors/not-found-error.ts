import BaseError from './base-error';

class NotFoundError extends BaseError {
  constructor(message = 'Ресурс не найден') {
    super(message, 404);
  }
}

export default NotFoundError;
