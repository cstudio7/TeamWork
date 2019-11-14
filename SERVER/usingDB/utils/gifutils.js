

export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.payload = null;
    this.error = null;
    this.message = null;
  }

  setSuccess(statusCode, payload, message) {
    this.statusCode = statusCode;
    this.payload = payload;

    this.type = 'success';
  }

  setSuccessful (statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.type = 'success';
  }

  setError(statusCode, error) {
    this.statusCode = statusCode;
    this.error = error;
    this.type = 'error';
  }

  send(res) {
    const result = {
      status: this.type,
      payload: this.payload,
    };

    if (this.type === 'success') {
      const my1 = { message: this.message}
      return res.status(this.statusCode).json({
        status: 'success',
        data: {...this.payload}
      });
    }
    if (this.type === 'error') {
      return res.status(this.statusCode).json({
        status: this.type,
        error: this.error,
    }

    )}
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}
