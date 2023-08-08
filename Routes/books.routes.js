const express = require('express');
const BooksController = require('../Controllers/books.controller');
const router = express.Router();

const booksControllerInstance = new BooksController();

router.get('/', booksControllerInstance.getAllBooks.bind(booksControllerInstance));
router.get('/:id', booksControllerInstance.getBookById.bind(booksControllerInstance));
router.post('/', booksControllerInstance.addBook.bind(booksControllerInstance));
router.put('/:id', booksControllerInstance.updateBook.bind(booksControllerInstance));
router.delete('/:id', booksControllerInstance.deleteBook.bind(booksControllerInstance));

module.exports = router