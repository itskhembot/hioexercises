import AccountModel from '../../models/account';


export default {
  Query: {
    account: async (obj, args) => (
      AccountModel.findOne({ where: { id: args.id } })),
  },
};
