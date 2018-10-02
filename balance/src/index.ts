import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
const path = require("path");

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

const apollo = new ApolloServer({ schema });

let apollorun;

async function start(port) {
  apollorun = await apollo.listen(port).then(({ server }) => server);
  return apollorun;
}

async function stop() {
  return new Promise(resolve => apollorun.close(resolve));
}
module.exports = { start, stop };
