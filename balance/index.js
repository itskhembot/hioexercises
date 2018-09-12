const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const accounts = [
  {
    id:1,
	balance:200,
	availablebalance:100,
  },
  {
    id:2,
	balance:100,
	availablebalance:150,
  },
];
const reservedbalance = [
  {
    id:1,
	context:"test balance for id 1",
	balance:100,
  },
];
const virtualbalance = [
  {
    id:1,
	context:"allocate budget for id 2",
	balance:50,
  },
];
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
type Account {
  id: ID!
  balance: Float!
  availableBalance(context: String): Float!
}

type ReservedBalance {
  id: ID!
  context: String!
  balance: Float!
}

type VirtualBalance {
  id: ID!
  context: String!
  balance: Float!
}

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    accounts: [Account]
	reservedbalance: [ReservedBalance]
	virtualbalance: [VirtualBalance]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    accounts: () => accounts,
    reservedbalance: () => reservedbalance,
    virtualbalance: () => virtualbalance,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`??  Server ready at ${url}`);
});