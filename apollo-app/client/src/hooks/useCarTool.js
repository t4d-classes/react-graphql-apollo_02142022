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

  const addCar = useCallback(async car => {

    const result = await mutateAppendCar({
      variables: {
        newCar: car,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

    editCarIdVar(-1);

    return result;

  }, [mutateAppendCar]);

  const saveCar = useCallback(async car => {

    const result = await mutateReplaceCar({
      variables: {
        car,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

    editCarIdVar(-1);

    return result;

  }, [mutateReplaceCar]);

  const deleteCar = useCallback(async carId => {

    const result = await mutateRemoveCar({
      variables: {
        carId,
      },
      refetchQueries: [ { query: CAR_TOOL_QUERY } ],
    });

    editCarIdVar(-1);

    return result;

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