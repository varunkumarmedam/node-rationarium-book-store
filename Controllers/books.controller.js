const sequelize = require("../Helpers/config"); // Your Sequelize configuration file
const ResponseInterceptor = require("../Helpers/response-intersecptor");

module.exports = class BooksController {
  successResponse = new ResponseInterceptor().successResponse;
  errorResponse = new ResponseInterceptor().errorResponse;

  async getAllBooks(req, res) {
    try {
      // Executing a raw query
      const [data] = await sequelize.query("SELECT * FROM books");
      this.successResponse(res, 200, data, "BooksController.getAllBooks");
    } catch (err) {
      this.errorResponse(res, 404, err, "BooksController.getAllBooks");
    }
  }

  async getBookById(req, res) {
    try {
      const bookId = req.params.id;

      if (!bookId || bookId == "") {
        this.errorResponse(
          res,
          404,
          "Please provide book id",
          "BooksController.getBookById"
        );
        return;
      }

      // Executing a raw query
      const [data] = await sequelize.query(
        `SELECT * FROM books where id = ${bookId}`
      );

      this.successResponse(res, 200, data, "BooksController.getBookById");
    } catch (err) {
      this.errorResponse(res, 501, err, "BooksController.getBookById");
    }
  }

  async addBook(req, res) {
    try {
      if (!req.body.title || req.body.title == "") {
        this.errorResponse(
          res,
          404,
          "Please provide title",
          "BooksController.addBook"
        );
        return;
      }

      if (!req.body.author || req.body.author == "") {
        this.errorResponse(
          res,
          404,
          "Please provide author name",
          "BooksController.addBook"
        );
        return;
      }

      if (!req.body.publishedYear || req.body.publishedYear == "") {
        this.errorResponse(
          res,
          404,
          "Please provide published year",
          "BooksController.addBook"
        );
        return;
      }

      const insertBookQuery = `INSERT INTO books (id, title, author, publishedYear) VALUES ('${Date.now()}', '${
        req.body.title
      }', '${req.body.author}', ${req.body.publishedYear}); `;

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
      this.errorResponse(res, 404, err, "BooksController.addBook");
    }
  }

  async updateBook(req, res) {
    try {
      const bookId = req.params.id;

      if (!bookId || bookId == "") {
        this.errorResponse(
          res,
          404,
          "Please provide book id",
          "BooksController.updateBook"
        );
        return;
      }

      delete req.body.id; // deleting book id if passed in body to avoid unexpected id overwriting

      const fieldNames = Object.keys(req.body);
      const fieldUpdates = fieldNames
        .map((fieldName) => `${fieldName} = ?`)
        .join(", "); // Getting all user input fields

      // return error if no valid fields are pased
      if (fieldNames.length == 0) {
        this.errorResponse(
          res,
          404,
          "Please provide valid information",
          "BooksController.updateBook"
        );
        return;
      }

      const query = `
      UPDATE books
      SET ${fieldUpdates}
      WHERE id = ?;
    `; // Creating dynamic query based on the user input fields

      const fieldValues = [...Object.values(req.body), bookId];

      // Execute a raw query
      const [results, metadata] = await sequelize.query(query, fieldValues);

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
      this.errorResponse(res, 404, err, "BooksController.updateBook");
    }
  }

  async deleteBook(req, res) {
    try {
      const bookId = req.params.id;

      if (!bookId || bookId == "") {
        this.errorResponse(
          res,
          404,
          "Please provide book id",
          "BooksController.deleteBook"
        );
        return;
      }

      const query = `DELETE FROM books WHERE id = ?;`;

      // Execute a raw query
      const [results] = await sequelize.query(query, bookId);

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
};
