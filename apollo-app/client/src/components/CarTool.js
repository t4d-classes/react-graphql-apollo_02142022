import { useCarTool } from '../hooks/useCarTool';

import { CarTable } from './CarTable';
import { CarForm } from './CarForm';


export const CarTool = () => {

  const { loading, error, cars, colorLookup, addCar } = useCarTool();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <CarTable cars={cars} />
      <CarForm buttonText="Add Car"
        colorLookup={colorLookup} onSubmitCar={addCar} />
    </>
  );

};