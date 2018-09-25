import Sequelize from 'sequelize';

module.exports = new Sequelize('balance', 'postgres', 'yuadnat', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

});
