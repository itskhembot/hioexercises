import sequelize from '../sequelize.js';
  
  const AccountModel= sequelize.define('Account', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: sequelize.Sequelize.DOUBLE,
  availablebalance: sequelize.Sequelize.DOUBLE,
}, { tableName: 'account', freezeTableName: true, timestamps: false });

export default AccountModel;