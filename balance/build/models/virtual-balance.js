"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("../lib/sequelize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VirtualBalanceModel = _sequelize.default.define('VirtualBalance', {
  id: {
    type: _sequelize.default.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account: _sequelize.default.Sequelize.INTEGER,
  context: _sequelize.default.Sequelize.STRING,
  balance: _sequelize.default.Sequelize.DOUBLE,
  isCommit: _sequelize.default.Sequelize.BOOLEAN
}, {
  tableName: 'VirtualBalance',
  freezeTableName: true,
  timestamps: false
});

var _default = VirtualBalanceModel;
exports.default = _default;