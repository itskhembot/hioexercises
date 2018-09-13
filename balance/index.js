const { ApolloServer, gql } = require('apollo-server');
const  { makeExecutableSchema } = require('graphql-tools');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('balance', 'postgres', 'yuadnat', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
  const Account = sequelize.define('Account', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: sequelize.Sequelize.DOUBLE,
  availablebalance: sequelize.Sequelize.DOUBLE,
}, { tableName: 'account', freezeTableName: true, timestamps: false });


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
type Account {
  id: ID!
  balance: Float!
  availablebalance(context: String): Float!
}

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    account(id: ID!): Account
	accounts: [Account]
  }
schema {
  query: Query
}
  `;

// Resolvers define the technique for fetching the types in the
// schema. 
const resolvers = {
  Query: {
    //account: (id) => accounts.findById(obj.id),
	account: async function(obj,args) {
		return Account.findOne({where: {id: args.id}});
        },
    accounts: async function(obj,args) {
		return Account.findAll();
        },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
const server = new ApolloServer({ schema });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`??  Server ready at ${url}`);
});