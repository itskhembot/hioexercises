import sequelize from '../sequelize.js';

const VirtualBalanceModel = sequelize.define('VirtualBalance', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountid: sequelize.Sequelize.INTEGER,
  context: sequelize.Sequelize.STRING,
  balance: sequelize.Sequelize.DOUBLE,
  iscommit: sequelize.Sequelize.BOOLEAN,
}, { tableName: 'virtualbalance', freezeTableName: true, timestamps: false });

export default VirtualBalanceModel;