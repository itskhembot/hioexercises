import RequestModel from '../models/request';

module.exports = {
  idempotency: async (args, handler) => {
    const request = await RequestModel.findOne({ where: { id: args.request } });
    if (request && request.result) {
      return request.result;
    }

    if (request && request.error) {
      throw new Error(request.error.message);
    }

    let result;
    let error;
    try {
      result = await handler(args);
    } catch (err) {
      error = err;
      result = err;
    }
    await RequestModel.create({
      id: args.request,
      result,
      error,
    });
    return result;
  },
};
