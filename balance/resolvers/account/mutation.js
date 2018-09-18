import RequestModel from '../../models/request';

export default {
  Mutation: {
    updateBalance: function (obj, args) {
      RequestModel.findOrCreate({
        where: {
          uuId: args.request
        },
        defaults: {//object containing fields and values to apply
          uuId: args.request,
          accountId: args.accountid,
          amount: args.amount,
          resultSet: args.amount,
          requestType: "updateBalance",
        },
      }).spread((RequestModel, created) => {
        return RequestModel.get('amount');
      });
    },
  },
};