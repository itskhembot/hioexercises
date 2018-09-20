"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _account = _interopRequireDefault(require("../../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    account: async (obj, args) => {
      return _account.default.findOne({
        where: {
          id: args.id
        }
      });
    } //accounts: async function(obj,args) {
    //	return Account.findAll();
    //   },

  }
};
exports.default = _default;