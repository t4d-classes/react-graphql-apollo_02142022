import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    age: Int
    price: Float!
    nums: [Int]
    color(colorId: ID): Color
    colors: [Color]
    cars(make: String): [Car]
  }

  type Color {
    id: ID
    name: String
    hexcode: String
  }

  type Car {
    id: ID
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }
`;
