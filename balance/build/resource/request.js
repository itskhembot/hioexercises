"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("../models/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  idempotency: async (args, handler) => {
    const request = await _request.default.findOne({
      where: {
        id: args.request
      }
    });

    if (request) {
      if (request.result) {
        return request.result;
      } else if (request.error) {
        throw new Error(request.error.message);
      }
    } else {
      let result;
      let error;

      try {
        result = await handler(args);
      } catch (err) {
        error = err;
      }

      await _request.default.create({
        id: args.request,
        result,
        error
      });
      return result;
    }
  }
};
exports.default = _default;