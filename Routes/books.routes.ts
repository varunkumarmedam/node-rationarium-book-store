import express from "express";
import BooksController from "../Controllers/books.controller";

const router = express.Router();

const booksControllerInstance: BooksController = new BooksController();

router.get("/", booksControllerInstance.getAllBooks.bind(booksControllerInstance));
router.get("/:id", booksControllerInstance.getBookById.bind(booksControllerInstance));
router.post("/", booksControllerInstance.addBook.bind(booksControllerInstance));
router.put("/:id", booksControllerInstance.updateBook.bind(booksControllerInstance));
router.delete("/:id", booksControllerInstance.deleteBook.bind(booksControllerInstance));

export default router;
