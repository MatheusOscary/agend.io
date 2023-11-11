const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agendio', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306, 
  });
  

module.exports = sequelize;