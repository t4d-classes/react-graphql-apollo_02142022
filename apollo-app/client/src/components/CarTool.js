import { useCarTool } from '../hooks/useCarTool';

import { CarTable } from './CarTable';
import { CarForm } from './CarForm';


export const CarTool = () => {

  const {
    loading, error, cars, editCarId, colorLookup,
    addCar, saveCar, deleteCar, editCar, cancelCar,
  } = useCarTool();

  if (loading) return <p>Loading</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  return (
    <>
      <CarTable cars={cars} editCarId={editCarId}
        onEditCar={editCar} onDeleteCar={deleteCar}
        onSaveCar={saveCar} onCancelCar={cancelCar} />
      <CarForm buttonText="Add Car"
        colorLookup={colorLookup} onSubmitCar={addCar} />
    </>
  );

};