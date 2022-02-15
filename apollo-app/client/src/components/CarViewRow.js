import { gql } from '@apollo/client';

export const CarViewRow = ({ car }) => {

  return (
    <tr>
      <td>{car.id}</td>
      <td>{car.make}</td>
      <td>{car.model}</td>
      <td>{car.year}</td>
      <td>{car.color}</td>
      <td>{car.price}</td>
    </tr>
  );

}

CarViewRow.fragments = {
  car: gql`
    fragment CarViewRow_Car on Car {
      id make model year color price
    }
  `
};