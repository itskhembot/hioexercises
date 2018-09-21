import AccountModel from '../../models/account';


export default {
  Query: {
    account: async (obj, args) => (
      AccountModel.findOne({ where: { id: args.id } })),
    //  accounts: async function(obj,args) {
    //  return Account.findAll();
    //   },
  },
};
