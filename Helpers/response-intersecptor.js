const { Response } = require('express');

module.exports = class ResponseInterceptor {
  // public logger: Logger;
  constructor() {
    // this.logger = new Logger();
  }
  successResponse(res, code, data, _function) {
    console.log(`LOG: [${res.req.method}] [${_function}]`);
    return res.status(code).send(data);
  }
  errorResponse(res, code, message, _function, err) {
    console.log(`Error LOG: [${res.req.method}] [${_function}] [${err}]`);
    return res.status(code).send({ error: message });
  }
};
