import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize: Sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres", // Change this to 'mysql' for MySQL, 'sqlite' for SQLite, etc.
});

export default sequelize;
