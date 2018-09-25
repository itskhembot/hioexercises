import AccountModel from '../../models/account';


module.exports = {
  Query: {
    account: async (obj, args) => (
      AccountModel.findOne({ where: { id: args.id } })),
  },
};
