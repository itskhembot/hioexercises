import sequelize from '../lib/sequelize.js';

const RequestModel = sequelize.define('Request', {
  uuid: sequelize.Sequelize.STRING,
  accountId: sequelize.Sequelize.INTEGER,
  reserveBalanceId: sequelize.Sequelize.INTEGER,
  virtualBalanceId: sequelize.Sequelize.INTEGER,
  amount: sequelize.Sequelize.DOUBLE,
  resultSet: sequelize.Sequelize.STRING,
  requestType: sequelize.Sequelize.DOUBLE,
}, { tableName: 'request', freezeTableName: true, timestamps: false });

export default RequestModel;