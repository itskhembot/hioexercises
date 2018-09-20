"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("../../models/request"));

var _virtualBalance = _interopRequireDefault(require("../../models/virtual-balance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Mutation: {
    createVirtualBalance: async (obj, args) => {
      const createVirtualBalance = _virtualBalance.default.create({
        account: args.account,
        context: args.context,
        balance: args.amount
      });

      return createVirtualBalance;
    }
  }
};
exports.default = _default;