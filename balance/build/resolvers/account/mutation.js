"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("../../models/request"));

var _account = _interopRequireDefault(require("../../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Mutation: {
    updateBalance: async (obj, args) => {
      const request = await _request.default.findOne({
        where: {
          id: args.request
        }
      });

      try {
        if (!request) {
          const accountUpdate = await _account.default.findOne({
            where: {
              id: args.account
            }
          }).on('success', function (AccountModel) {
            if (AccountModel) {
              AccountModel.updateAttributes({
                balance: args.amount
              });
            }
          });
          const newrequest = await _request.default.build({
            id: args.request,
            result: args.amount
          });
          console.log(newrequest.result);
          return newrequest.result;
        } //create function updateDBBalance
        //call idempotency from updateBalance mutation that returns string?
        //idempotency calls updatebalance to update db
        //check result returned?
        //return float?


        console.log(request.result);
        return request.result;
      } catch (err) {
        let request = await _request.default.build({
          id: args.request,
          result: err.message,
          error: err
        });
        console.log(err);
        return 0;
      }
    }
  }
};
exports.default = _default;