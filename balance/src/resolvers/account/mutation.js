import RequestModel from '../../models/request';
import AccountModel from '../../models/account';

export default {
  Mutation: {
    updateBalance: async (obj, args) => {
      await AccountModel.findOne({ where: { id: args.account } })
        .on('success', (result) => {
          if (result) {
            AccountModel.updateAttributes({
              balance: args.amount,
            });
          }
        });
      const newrequest = await RequestModel.build({
        id: args.request,
        result: args.amount,
      });
      //  console.log(accountUpdate.result);
      return newrequest.result;
    },
  },
};
