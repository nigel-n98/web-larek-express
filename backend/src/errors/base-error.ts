abstract class BaseError extends Error {
  public statusCode: number;

  protected constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default BaseError;
