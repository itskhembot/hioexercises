import AccountModel from '../../models/account';


export default{
  Query: {
	account: function(obj,args) {
		return AccountModel.findOne({where: {id: args.id}});
        },
    //accounts: async function(obj,args) {
	//	return Account.findAll();
     //   },
  },
};