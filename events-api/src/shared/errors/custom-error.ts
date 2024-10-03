export class CustomError extends Error {
  private _message: string;
  private _statusCode: number;

  constructor(params: { message: string; statusCode: number }) {
    super(params.message);

    this._message = params.message;
    this._statusCode = params.statusCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this._statusCode;
  }
}
