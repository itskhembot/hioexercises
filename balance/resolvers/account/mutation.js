import RequestModel from '../../models/request';

export default {
  Mutation: {
    updateBalance: function ({args}) {
      return RequestModel.findOrCreate({
        where: {
          uuid: args.request
        },
        defaults: {//object containing fields and values to apply
          uuid: args.request,
          accountId: args.accountid,
          amount: args.amount,
          resultSet: args.amount,
          requestType: "updateBalance",
        },
      }).then(res => res[5][0].dataValues);
    },
  },
};