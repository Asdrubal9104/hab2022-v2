require('dotenv').config();
module.exports = {
  // localhost
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'sale_house',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};