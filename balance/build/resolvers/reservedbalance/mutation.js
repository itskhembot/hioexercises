"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("../../models/request"));

var _reservedBalance = _interopRequireDefault(require("../../models/reserved-balance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Mutation: {
    createReservedBalance: async (obj, args) => {
      const createReservedBalance = _reservedBalance.default.create({
        account: args.account,
        context: args.context,
        balance: args.amount
      });

      return createReservedBalance;
    }
  }
};
exports.default = _default;