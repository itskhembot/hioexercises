import RequestModel from '../../models/request';

export default {
  Mutation: {
    updateBalance: function (obj, args) {
      RequestModel.findOrCreate({
        where: {
          id: args.request
        },
        defaults: {//object containing fields and values to apply
          id: args.request,
          
        },
      }).spread((RequestModel, created) => {
         RequestModel.get('amount');
      });
    },
  },
};