const Sequelize = require('sequelize');

// Replace the database_url with your actual database connection string
const sequelize = new Sequelize('freedb_freedbbooks', 'freedb_freedbuseracct', 'aJG3CGNq*3G%cFR', {
  host: 'sql.freedb.tech',
  dialect: 'mysql', // Change this to 'mysql' for MySQL, 'sqlite' for SQLite, etc.
});

module.exports = sequelize;
