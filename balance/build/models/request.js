"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("../lib/sequelize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RequestModel = _sequelize.default.define('Request', {
  id: {
    type: _sequelize.default.Sequelize.STRING,
    primaryKey: true,
    autoIncrement: false
  },
  result: _sequelize.default.Sequelize.JSON,
  error: _sequelize.default.Sequelize.JSON
}, {
  tableName: 'Request',
  freezeTableName: true,
  timestamps: false
});

var _default = RequestModel;
exports.default = _default;