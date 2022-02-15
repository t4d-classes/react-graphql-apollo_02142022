import { useQuery, gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { CarTable } from '../components/CarTable';

const CAR_TOOL_QUERY = gql`
  ${CarTable.fragments.cars}
  query App {
    cars {
      ...CarTable_Cars
    }
    carExteriorColors
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

export const useCarTool = () => {

  const { loading, error, data } = useQuery(CAR_TOOL_QUERY);

  const [ mutateAppendCar ] = useMutation(APPEND_CAR_MUTATION);

  const addCar = useCallback(car => {

    return mutateAppendCar({
      variables: {
        newCar: car,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

  }, [mutateAppendCar]);  

  return {
    loading,
    error,
    cars: data?.cars ?? [],
    colorLookup: data?.carExteriorColors ?? [],
    addCar,
  };

};