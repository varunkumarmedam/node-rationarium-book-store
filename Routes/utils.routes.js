const express = require('express');
const utilsControllers = require('../Controllers/utils.controllers');
const router = express.Router();

// router.post('/signup', userControllers.userRegister);
// router.post('/login', userControllers.userLogin);
router.get('/create-books-table', utilsControllers.createBooksTable);

module.exports = router