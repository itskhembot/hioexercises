import sequelize from '../lib/sequelize.js';

const RequestModel = sequelize.define('Request', {
  uuId: sequelize.Sequelize.STRING,
  accountId: sequelize.Sequelize.INTEGER,
  reservedBalanceId: sequelize.Sequelize.INTEGER,
  virtualBalanceId: sequelize.Sequelize.INTEGER,
  amount: sequelize.Sequelize.DOUBLE,
  resultSet: sequelize.Sequelize.STRING,
  requestType: sequelize.Sequelize.DOUBLE,
}, { tableName: 'Request', freezeTableName: true, timestamps: false });

export default RequestModel;