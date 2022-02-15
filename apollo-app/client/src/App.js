import { useQuery, gql } from '@apollo/client';

import { CarTable } from './components/CarTable';

const APP_QUERY = gql`
  query App {
    message
    cars {
      id make model year color price
    }
  }
`;

function App() {

  const { loading, error, data } = useQuery(APP_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <CarTable cars={data.cars} />
  );

}

export default App;
