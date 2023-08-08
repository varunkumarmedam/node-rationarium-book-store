var express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Helpers/config");

var booksRouter = require("./Routes/books.routes");
var utilsRouter = require("./Routes/utils.routes");
// var adminRouter = require("./Routes/admin.routes");

var app = express();

// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/add", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    res.send({
      status: "done",
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.send({
      status: "failed to connect",
      error:error
    });
  }
});

app.use("/api/books", booksRouter);
app.use("/utils", utilsRouter);

app.listen(3000, () => {
  console.log("Listening at 3000");
});
