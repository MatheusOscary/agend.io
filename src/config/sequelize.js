const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agendio', 'root', 'Amothesky3', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3300, 
  });
  

module.exports = sequelize;