import RequestModel from '../../models/request';
import AccountModel from '../../models/account';
export default {
  Mutation: {
    updateBalance: async (obj, args) => {
      let request = await RequestModel.findOne({
        where: {
          id: args.request
        }
      });
      if (!request) {
        const account = await AccountModel.findOne({ where: { id: args.account } })
          .on('success', function (AccountModel) {
            if (AccountModel) {
              AccountModel.updateAttributes({
                balance: args.amount
              })}
          });
          let request = await RequestModel.build({
            id: args.request,
            result: args.amount
          });
          return request.result;
        }

            //findOne if found
            //return request.result;
            //else
            //updatebalance
            //create request
            //return result
      return request.result;
     },
  },
};