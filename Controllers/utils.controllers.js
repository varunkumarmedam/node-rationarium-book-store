const sequelize = require("../Helpers/config"); // Your Sequelize configuration file

async function createBooksTable(req, res) {
  try {
    // Execute a raw query
    const createTableQuery = `
      CREATE TABLE books (
        id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publishedYear INT NOT NULL,
        PRIMARY KEY (id)
      )
    `;

    const [results] = await sequelize.query(createTableQuery);

    console.log("Query results:", results);
    res.send({
      result: results,
    });
  } catch (err) {
    console.error("Error executing raw query:", err);
    res.send({
      result: "Something went wrong",
    });
  } finally {
    // Don't forget to close the Sequelize connection
    await sequelize.close();
  }
}

module.exports = {
  createBooksTable,
};
