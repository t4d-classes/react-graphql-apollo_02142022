import {
  ApolloClient, HttpLink, InMemoryCache,
  split, ApolloLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { RestLink } from 'apollo-link-rest';

import { activeToolVar } from './vars';

const restLink = new RestLink({ uri: "http://localhost:5050/" });

const httpLink = new HttpLink({
  credentials: "same-origin",
  uri: "http://localhost:5025/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:5025/graphql",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return (
      kind === "OperationDefinition" && operation === "subscription"
    );
  },
  wsLink, // function returns true
  httpLink, // function returns false
);

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([ restLink, splitLink ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          activeTool: {
            read() {
              return activeToolVar();
            }
          }
        },
      },
    },
  }),
});