import express from "express";
import bodyParser from "body-parser";

import booksRouter from "./Routes/books.routes";
import utilsRouter from "./Routes/utils.routes";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books", booksRouter);
app.use("/utils", utilsRouter);

app.listen(3000, () => {
  console.log("Listening at 3000");
});