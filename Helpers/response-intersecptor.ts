import { Request, Response } from "express";

export default class ResponseInterceptor {
  successResponse(res: Response, code: number, data: any, _function: any) {
    console.log(`LOG: [${res.req.method}] [${_function}]`);
    return res.status(code).send(data);
  }
  errorResponse(res: Response, code: number, message: any, _function: any, err: any) {
    console.log(`Error LOG: [${res.req.method}] [${_function}] [${err}]`);
    return res.status(code).send({ error: message });
  }
}
