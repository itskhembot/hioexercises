import '@babel/polyfill';

const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(
    fileLoader(
      path.join(__dirname, '/types'),
      { recursive: true },
    ),
  ),
  resolvers: mergeResolvers(
    fileLoader(
      path.join(__dirname, '/resolvers'),
      { recursive: true },
    ),
  ),
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`??  Server ready at ${url}`);
});
