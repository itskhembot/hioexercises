import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

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

let apollorun: any;

export async function start(port: number) {
  apollorun = await apollo.listen(port);
  return apollorun;
}

export async function stop() {
  return new Promise(resolve => apollorun.close(resolve));
}
