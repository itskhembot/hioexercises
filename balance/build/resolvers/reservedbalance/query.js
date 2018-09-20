"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reservedBalance = _interopRequireDefault(require("../../models/reserved-balance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    reservedBalance: async (obj, args) => {
      return _reservedBalance.default.findOne({
        where: {
          id: args.id
        }
      });
    },
    reservedBalances: async (obj, args) => {
      return _reservedBalance.default.findAll({
        where: {
          account: args.account
        }
      });
    }
  }
};
exports.default = _default;