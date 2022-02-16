import PropTypes from 'prop-types';
import { gql } from '@apollo/client';

import { CarEditRow } from './CarEditRow';
import { CarViewRow } from './CarViewRow';


export const CarTable = ({
  cars, editCarId,
  onEditCar: editCar,
  onDeleteCar: deleteCar,
  onSaveCar: saveCar,
  onCancelCar: cancelCar,
}) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map(car =>
          car.id === editCarId
          ? <CarEditRow key={car.id} car={car}
              onSaveCar={saveCar} onCancelCar={cancelCar} />
          : <CarViewRow key={car.id} car={car}
              onEditCar={editCar} onDeleteCar={deleteCar} />)}
      </tbody>
    </table>
  )

};

CarTable.defaultProps = {
  cars: [],
};

CarTable.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

CarTable.fragments = {
  cars: gql`
    ${CarViewRow.fragments.car}
    ${CarEditRow.fragments.car}
    fragment CarTable_Cars on Car {
      id
      ...CarViewRow_Car
      ...CarEditRow_Car
    }
  `
}