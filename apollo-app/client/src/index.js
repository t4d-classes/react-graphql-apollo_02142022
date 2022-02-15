import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import { client } from './apolloClient';
import App from './App';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root'),
);