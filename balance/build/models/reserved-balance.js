"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("../lib/sequelize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReservedBalanceModel = _sequelize.default.define('ReservedBalance', {
  id: {
    type: _sequelize.default.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account: _sequelize.default.Sequelize.INTEGER,
  context: _sequelize.default.Sequelize.STRING,
  balance: _sequelize.default.Sequelize.DOUBLE,
  isReleased: _sequelize.default.Sequelize.BOOLEAN
}, {
  tableName: 'ReservedBalance',
  freezeTableName: true,
  timestamps: false
});

var _default = ReservedBalanceModel;
exports.default = _default;