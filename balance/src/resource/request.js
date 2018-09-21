import RequestModel from '../models/request';

export default {

  idempotency: async (args, handler) => {
    const request = await RequestModel.findOne({ where: { id: args.request } });
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
      await RequestModel.create({
        id: args.request,
        result,
        error,
      });
      return result;
    }

  }
};