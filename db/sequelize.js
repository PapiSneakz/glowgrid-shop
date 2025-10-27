// db/sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/mydb', {
  dialect: 'postgres',
  logging: false, // set to console.log for debugging
  dialectOptions: {
    // ssl: { rejectUnauthorized: false } // enable if using Heroku or cloud DB with SSL
  }
});

module.exports = sequelize;
