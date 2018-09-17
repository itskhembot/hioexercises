import RequestModel from '../../models/request';

export default {
  Mutation: {
    updateBalance: function () {
      return RequestModel.findOrCreate({
        where: {
          uuid: args.request
        },
        defaults: {//object containing fields and values to apply
          uuid: args.request,
          accountid: args.accountid,
          amount: args.amount,
          resultset: args.amount,
          requesttype: "updateBalance",
        },
      }).then(res => res[5][0].dataValues);
    },
  },
};