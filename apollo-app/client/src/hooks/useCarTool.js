import { 
  useQuery, useMutation, useSubscription,
  gql, makeVar, useReactiveVar,
} from '@apollo/client';
import { useCallback } from 'react';

import { CarTable } from '../components/CarTable';

const CAR_TOOL_QUERY = gql`
  ${CarTable.fragments.cars}
  query App {
    cars {
      ...CarTable_Cars
    }
    carExteriorColors @rest(type: "[String]", path: "carExteriorColors")
    moreCars @rest(type: "[FunCar]", path: "cars") {
      id
      make
      model
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

const CAR_APPENDED_SUBSCRIPTION = gql`
  subscription CarAppended {
    carAppended {
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

  // useSubscription(
  //   CAR_APPENDED_SUBSCRIPTION,
  //   {
  //     onSubscriptionData: ({
  //       client, subscriptionData: { data: { carAppended } },
  //     }) => {

  //       if (!carAppended) {
  //         return;
  //       }

  //       const originalData = client.readQuery({ query: CAR_TOOL_QUERY });

  //       const data = {
  //         ...originalData,
  //         cars: [
  //           ...originalData.cars,
  //           carAppended,
  //         ],
  //       };

  //       client.writeQuery({ query: CAR_TOOL_QUERY, data });      
  //     },
  //   },
  // );

  const [ mutateAppendCar ] = useMutation(APPEND_CAR_MUTATION);
  const [ mutateReplaceCar ] = useMutation(REPLACE_CAR_MUTATION);
  const [ mutateRemoveCar ] = useMutation(REMOVE_CAR_MUTATION);

  const addCar = useCallback(async car => {

    const result = await mutateAppendCar({
      variables: {
        newCar: car,
      },
      // refetchQueries: [ { query: CAR_TOOL_QUERY } ],
      // optimisticResponse: {
      //   appendCar: {
      //     ...car,
      //     id: Math.floor(Math.random() * -10000),
      //     __typename: "Car",
      //   }
      // },
      // update(cache, response) {
      //   const originalData = cache.readQuery({ query: CAR_TOOL_QUERY });
      //   const data = {
      //     ...originalData,
      //     cars: [
      //       ...originalData.cars,
      //       response?.data?.appendCar,
      //     ],
      //   };
      //   console.log(response?.data?.appendCar?.id);
      //   cache.writeQuery({ query: CAR_TOOL_QUERY, data });
      // }
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