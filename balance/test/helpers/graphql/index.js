import Router from 'koa-router';
import '@babel/polyfill';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import compose from 'koa-compose';
import { applyMiddleware } from 'graphql-middleware';

const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const router = new Router();
const graphqlSchema = (ctx) => {
  try {
    const schema = makeExecutableSchema({
      typeDefs: mergeTypes(
        fileLoader(
          path.join(__dirname, '../../../src/types'),
          { recursive: true },
        ),
      ),
      resolvers: mergeResolvers(
        fileLoader(
          path.join(__dirname, '../../../src/resolvers'),
          { recursive: true },
        ),
      ),
    });
    const formatError = (error) => {
      if (error.originalError) {
        Object.assign(error, JSON.parse(error.originalError.message));
      }
    };
    return {
      schema: applyMiddleware(
        schema,
      ),
      formatError,
      debug: true,
      context: ctx,
    };
  } catch (err) {
    throw new Error(err);
  }
};

router.post('/graphql', graphqlKoa(graphqlSchema));
router.get('/graphql', graphqlKoa(graphqlSchema));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

export default compose([router.routes(), router.allowedMethods()]);