import { useQuery, gql } from '@apollo/client';

import { BookISBNList, BookPriceList } from './components/BookList';
import { CarTable } from './components/CarTable';

const APP_QUERY = gql`
  ${CarTable.fragments.cars}
  ${BookISBNList.fragments.books}
  ${BookPriceList.fragments.books}
  query App {
    cars {
      ...CarTable_Cars
    }
    isbnBooks: books {
      ...BookISBNListBooks
    }
    priceBooks: books {
      ...BookPriceListBooks
    }
  }
`;

function App() {

  const { loading, error, data } = useQuery(APP_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <BookISBNList books={data.isbnBooks} />
      <BookPriceList books={data.priceBooks} />
      <CarTable cars={data.cars} />
    </>
  );

}

export default App;
