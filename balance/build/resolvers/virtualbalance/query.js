"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _virtualBalance = _interopRequireDefault(require("../../models/virtual-balance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    virtualBalance: async (obj, args) => {
      return _virtualBalance.default.findOne({
        where: {
          id: args.id
        }
      });
    },
    virtualBalances: async (obj, args) => {
      return _virtualBalance.default.findAll({
        where: {
          account: args.account
        }
      });
    }
  }
};
exports.default = _default;