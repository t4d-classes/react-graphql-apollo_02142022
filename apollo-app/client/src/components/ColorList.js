import { gql } from '@apollo/client';

export const ColorList = ({ colors }) => {
  return (
    <ul>
      {colors.map(color => <li key={color.id}>
        {color.name} {color.hexcode}
      </li>)}
    </ul>
  );
}

ColorList.fragments = {
  colors: gql`
    fragment ColorListColors on Color {
      id
      name
      hexcode
    }
  ` 
};