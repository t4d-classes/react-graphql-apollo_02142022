import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    age: Int
    price: Float!
    nums: [Int]
    color(colorId: ID): Color
    colors: [Color]
  }

  """
  Color Object Type
  """
  type Color {
    id: ID
    name: String
    hexcode: String
  }
`;
