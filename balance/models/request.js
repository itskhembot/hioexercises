import sequelize from '../sequelize.js';

const RequestModel = sequelize.define('Request', {
  uuid: sequelize.Sequelize.STRING,
  accountid: sequelize.Sequelize.INTEGER,
  reservebalanceid: sequelize.Sequelize.INTEGER,
  virtualbalanceid: sequelize.Sequelize.INTEGER,
  amount: sequelize.Sequelize.DOUBLE,
  resultset: sequelize.Sequelize.STRING,
  requesttype: sequelize.Sequelize.DOUBLE,
}, { tableName: 'request', freezeTableName: true, timestamps: false });

export default RequestModel;