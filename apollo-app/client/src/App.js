import { useQuery, gql } from '@apollo/client';

const APP_QUERY = gql`
  query App {
    message
  }
`;

function App() {

  const { loading, error, data } = useQuery(APP_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <p>{data.message}</p>
  );

}

export default App;
