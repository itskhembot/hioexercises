import { ApolloServer } from 'apollo-server';


const apollo = new ApolloServer({  });

let apollorun: any;

export async function start(port: number) {
  apollorun = await apollo.listen(port);
  return apollorun;
}

export async function stop() {
  return new Promise(resolve => apollorun.close(resolve));
}
