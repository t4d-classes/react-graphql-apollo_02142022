import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  credentials: "same-origin",
  uri: "http://localhost:5025/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});