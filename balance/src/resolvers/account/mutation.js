import RequestModel from '../../models/request';

export default {
  Mutation: {
    updateBalance: async (obj, args) => {
      const request = RequestModel.findOrCreate({
        where: {
          id: args.request
        },
        defaults: {//object containing fields and values to apply
          id: args.request,
          
        },
      });
      //findOne if found
      //return request.result;
      //else
      //create request
      //updatebalance
      //return amount

    },
  },
};