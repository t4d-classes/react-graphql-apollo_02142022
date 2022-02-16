import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';


import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let apollo = null;
let httpServer = null;
let subscriptionServer = null;

export const getApollo = async (app) => {

  if (!apollo) {

    httpServer = http.createServer(app);

    subscriptionServer = new SubscriptionServer({
      execute, subscribe, schema,
    }, {
      server: httpServer, path: '/graphql',
    });

    apollo = new ApolloServer({
      schema,
      context: async ({ req, res }) => {
        return {
          req,
          res,
          restUrl: process.env.REST_URL,
          airlineRestUrl: process.env.AIRLINE_REST_URL,
        };
      },
      plugins: [{
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }],
    });

    await apollo.start();
  }

  return [apollo, httpServer, subscriptionServer];
}




