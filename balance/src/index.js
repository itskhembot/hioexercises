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

const apollo = new ApolloServer({ schema });

async function start(port) {
  return apollo.listen(port).then(({ server }) => server);
}
async function stop(port) {
  await new Promise(resolve => apollo.listen(port).then(({ server }) => server.close(resolve)));
}
module.exports = { start, stop };
