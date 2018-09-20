const { ApolloServer, gql } = require('apollo-server-koa');
import graphql from './graphql';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
const koa = new Koa();
let server = null;

async function start({ port = 8888 } = { port: 8888 }) {
  koa.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      throw new Error(err);
    }
  });

 
  koa.use(bodyparser());
  koa.use(cors({ maxAge: 2592000 }));
  koa.use(graphql);

  console.log(`Starting API server listening at port ${port}`);
  server = koa.listen(port);

  return server;
}

async function stop() {
  await new Promise((resolve) => {
    console.log('Stopping API server ...');
    server.close(resolve);
  });
}

export default { start, stop };