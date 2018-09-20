"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("../lib/sequelize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AccountModel = _sequelize.default.define('Account', {
  id: {
    type: _sequelize.default.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  balance: _sequelize.default.Sequelize.DOUBLE,
  availableBalance: _sequelize.default.Sequelize.DOUBLE
}, {
  tableName: 'Account',
  freezeTableName: true,
  timestamps: false
});

var _default = AccountModel;
exports.default = _default;