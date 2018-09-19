import RequestModel from '../../models/request';
import AccountModel from '../../models/account';
export default {
  Mutation: {
    updateBalance: async (obj, args) => {
        const request = await RequestModel.findOne({
          where: {
            id: args.request
          }
        });
      try {
        if (!request) {
          const accountUpdate = await AccountModel.findOne({ where: { id: args.account } })
            .on('success', function (AccountModel) {
              if (AccountModel) {
                AccountModel.updateAttributes({
                  balance: args.amount
                })
              }
            });
          const newrequest = await RequestModel.build({
            id: args.request,
            result: args.amount
          });
          console.log(newrequest.result);
          return newrequest.result;
        }
        //create function updateDBBalance
        //call idempotency from updateBalance mutation that returns string?
        //idempotency calls updatebalance to update db
        //check result returned?
        //return float?
        console.log(request.result);
        return request.result;
      } catch (err) {
        let request = await RequestModel.build({
          id: args.request,
          result: err.message,
          error: err
        });
        console.log(err);
        return 0;
      }
    },
  },
};