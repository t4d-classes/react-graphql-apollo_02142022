import { useQuery, gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { BookISBNList, BookPriceList } from './components/BookList';

import { ColorList } from './components/ColorList';
import { ColorForm } from './components/ColorForm';

import { CarTable } from './components/CarTable';
import { CarForm } from './components/CarForm';


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
    carExteriorColors
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

const APPEND_CAR_MUTATION = gql`
  mutation AppendCar($newCar: NewCar) {
    appendCar(car: $newCar) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

function App() {

  const { loading, error, data } = useQuery(APP_QUERY);

  const [ mutateAppendColor ] = useMutation(APPEND_COLOR_MUTATION);
  const [ mutateAppendCar ] = useMutation(APPEND_CAR_MUTATION);

  const addColor = useCallback(color => {

    return mutateAppendColor({
      variables: {
        newColor: color,
      },
      refetchQueries: [ { query: APP_QUERY } ],
    });

  }, [mutateAppendColor]);

  const addCar = useCallback(car => {

    return mutateAppendCar({
      variables: {
        newCar: car,
      },
      refetchQueries: [ { query: APP_QUERY } ],
    });

  }, [mutateAppendCar]);  

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <ColorList colors={data.colors} />
      <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
      <BookISBNList books={data.isbnBooks} />
      <BookPriceList books={data.priceBooks} />
      <CarTable cars={data.cars} />
      <CarForm buttonText="Add Car" colorLookup={data.carExteriorColors} onSubmitCar={addCar} />
    </>
  );

}

export default App;
