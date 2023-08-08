import sequelize from "../Helpers/config";
import ResponseInterceptor from "../Helpers/response-intersecptor";
import { Request, Response } from "express";

export default class BooksController {
  private successResponse: Function = new ResponseInterceptor().successResponse;
  private errorResponse: Function = new ResponseInterceptor().errorResponse;

  async getAllBooks(req: Express.Request, res: Response) {
    try {
      // Executing a raw query
      const [data] = await sequelize.query("SELECT * FROM books");
      this.successResponse(res, 200, data, "BooksController.getAllBooks");
    } catch (err) {
      this.errorResponse(res, 501, err, "BooksController.getAllBooks");
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const bookId: String = req?.params?.id;

      if (!bookId) {
        this.errorResponse(res, 404, "Please provide book id", "BooksController.getBookById");
        return;
      }

      const searchQuery: string = `SELECT * FROM books where id = '${bookId}'`;

      // Executing a raw query
      const [data] = await sequelize.query(searchQuery);

      this.successResponse(res, 200, data[0], "BooksController.getBookById");
    } catch (err) {
      this.errorResponse(res, 501, err, "BooksController.getBookById");
    }
  }

  async addBook(req: Request, res: Response) {
    try {
      const { title, author, publishedYear } = req.body;

      if (!title || title === "") {
        this.errorResponse(res, 404, "Please provide title", "BooksController.addBook");
        return;
      }

      if (!author || author === "") {
        this.errorResponse(res, 404, "Please provide author name", "BooksController.addBook");
        return;
      }

      if (!publishedYear || publishedYear === "" || typeof publishedYear !== "number") {
        this.errorResponse(res, 404, "Please provide published year", "BooksController.addBook");
        return;
      }

      const insertBookQuery: string = `INSERT INTO books (id, title, author, publishedYear) VALUES (${Date.now()}, '${title}', '${author}', ${publishedYear}); `;

      // Executing a raw query
      const [results] = await sequelize.query(insertBookQuery);

      this.successResponse(
        res,
        200,
        {
          message: results,
          status: "Added book successfully",
        },
        "BooksController.addBook"
      );
      return;
    } catch (err) {
      this.errorResponse(res, 501, err, "BooksController.addBook");
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const bookId: String = req.params.id;

      if (!bookId) {
        this.errorResponse(res, 404, "Please provide book id", "BooksController.updateBook");
        return;
      }

      const { id, ...updatedFields } = req.body;

      const fieldNames = Object.keys(updatedFields);
      const fieldUpdates = fieldNames.map((fieldName) => `${fieldName} = ?`).join(", ");

      // Return error if no valid fields are passed
      if (fieldNames.length === 0) {
        this.errorResponse(res, 404, "Please provide valid information", "BooksController.updateBook");
        return;
      }

      const query: string = `
      UPDATE books
      SET ${fieldUpdates}
      WHERE id = ?;
    `;

      const fieldValues: any[] = [...Object.values(updatedFields), bookId];

      // Execute a raw query
      const [results] = await sequelize.query({
        query: query,
        values: fieldValues,
      });

      this.successResponse(
        res,
        200,
        {
          message: results,
          status: "Updated book information successfully",
        },
        "BooksController.updateBook"
      );
      return;
    } catch (err) {
      this.errorResponse(res, 501, err, "BooksController.updateBook");
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const bookId: String = req.params.id;

      if (!bookId || bookId === "") {
        this.errorResponse(res, 404, "Please provide book id", "BooksController.deleteBook");
        return;
      }

      const query: string = `DELETE FROM books WHERE id = '${bookId}';`;

      // Execute a raw query
      const [results] = await sequelize.query(query);

      this.successResponse(
        res,
        200,
        {
          status: "Deleted book successfully",
          message: results,
        },
        "BooksController.deleteBook"
      );
      return;
    } catch (err) {
      this.errorResponse(
        res,
        501,
        {
          status: "Failed to delete book",
          message: err,
        },
        "BooksController.deleteBook"
      );
    }
  }
}
