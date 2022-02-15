import { useQuery, gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { BookISBNList, BookPriceList } from './components/BookList';
import { CarTable } from './components/CarTable';

import { ColorList } from './components/ColorList';
import { ColorForm } from './components/ColorForm';

const APP_QUERY = gql`
  ${ColorList.fragments.colors}
  ${CarTable.fragments.cars}
  ${BookISBNList.fragments.books}
  ${BookPriceList.fragments.books}
  query App {
    colors {
      ...ColorListColors
    }
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

const APPEND_COLOR_MUTATION = gql`
  mutation AppendColor($newColor: NewColor) {
    appendColor(color: $newColor) {
      id
      name
      hexcode
    }
  }
`;

function App() {

  const { loading, error, data } = useQuery(APP_QUERY);

  const [ mutateAppendColor ] = useMutation(APPEND_COLOR_MUTATION);

  const addColor = useCallback(color => {

    return mutateAppendColor({
      variables: {
        newColor: color,
      },
      refetchQueries: [ { query: APP_QUERY } ],
    });

  }, [mutateAppendColor]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <ColorList colors={data.colors} />
      <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
      <BookISBNList books={data.isbnBooks} />
      <BookPriceList books={data.priceBooks} />
      <CarTable cars={data.cars} />
    </>
  );

}

export default App;
