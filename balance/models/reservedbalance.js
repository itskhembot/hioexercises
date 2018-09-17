import sequelize from '../sequelize.js';

const ReservedBalanceModel = sequelize.define('ReservedBalance', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountid: sequelize.Sequelize.INTEGER,
  context: sequelize.Sequelize.STRING,
  balance: sequelize.Sequelize.DOUBLE,
  isreleased: sequelize.Sequelize.BOOLEAN,
}, { tableName: 'reservedbalance', freezeTableName: true, timestamps: false });

export default ReservedBalanceModel;