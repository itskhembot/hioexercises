import AccountModel from '../../models/account';


export default {
  Query: {
    account: async (obj, args)  => {
      const account = AccountModel.findOne({ where: { id: args.id } });
      return account;
    },
    //accounts: async function(obj,args) {
    //	return Account.findAll();
    //   },
  },
};