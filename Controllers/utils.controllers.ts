import { Request, Response } from "express";
import ResponseInterceptor from "../Helpers/response-intersecptor";
import sequelize from "../Helpers/config";

export default class UtilsController {
  private successResponse: Function = new ResponseInterceptor().successResponse;
  private errorResponse: Function = new ResponseInterceptor().errorResponse;

  async createBooksTable(req: Request, res: Response) {
    try {
      const createTableQuery: string = `
      CREATE TABLE books (
        id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publishedYear INT NOT NULL,
        PRIMARY KEY (id)
      )
    `;

      // Executing a raw query
      const [results] = await sequelize.query(createTableQuery);

      this.successResponse(
        res,
        200,
        {
          status: "Created books table successfully",
          message: results,
        },
        "UtilsController.createBooksTable"
      );
    } catch (err) {
      this.errorResponse(res, 501, err, "UtilsController.createBooksTable");
    }
  }
}
