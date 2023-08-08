import express from "express";
import UtilsController from "../Controllers/utils.controllers";

const router = express.Router();

const utilsControllerInstance: UtilsController = new UtilsController();

router.get("/create-books-table", utilsControllerInstance.createBooksTable.bind(utilsControllerInstance));

export default router;
