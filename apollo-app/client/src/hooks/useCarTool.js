import { useQuery, gql, useMutation, makeVar, useReactiveVar } from '@apollo/client';
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

const REPLACE_CAR_MUTATION = gql`
  mutation ReplaceCar($car: ExistingCar) {
    replaceCar(car: $car) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const REMOVE_CAR_MUTATION = gql`
  mutation RemoveCar($carId: ID) {
    removeCar(carId: $carId) {
      id
      make
      model
      year
      color
      price
    }
  }
`;


const editCarIdVar = makeVar(-1);

export const useCarTool = () => {

  const editCarId = useReactiveVar(editCarIdVar);

  const { loading, error, data } = useQuery(CAR_TOOL_QUERY);

  const [ mutateAppendCar ] = useMutation(APPEND_CAR_MUTATION);
  const [ mutateReplaceCar ] = useMutation(REPLACE_CAR_MUTATION);
  const [ mutateRemoveCar ] = useMutation(REMOVE_CAR_MUTATION);

  const addCar = useCallback(car => {

    return mutateAppendCar({
      variables: {
        newCar: car,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

  }, [mutateAppendCar]);

  const saveCar = useCallback(car => {

    return mutateReplaceCar({
      variables: {
        car,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

  }, [mutateReplaceCar]);

  const deleteCar = useCallback(carId => {

    return mutateRemoveCar({
      variables: {
        carId,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

  }, [mutateRemoveCar]);

  const editCar = useCallback(carId => editCarIdVar(carId), []);

  const cancelCar = useCallback(() => editCarIdVar(-1), []);

  return {
    loading,
    error,
    cars: data?.cars ?? [],
    editCarId,
    colorLookup: data?.carExteriorColors ?? [],
    addCar,
    saveCar,
    deleteCar,
    editCar,
    cancelCar,
  };

};