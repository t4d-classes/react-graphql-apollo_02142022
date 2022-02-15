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
    books: [Book]
    carExteriorColors: [String]
  }

  type Mutation {
    appendColor(color: NewColor): Color
    appendCar(car: NewCar): Car
  }

  type Color {
    id: ID
    name: String
    hexcode: String
  }

  input NewColor {
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
    formattedPrice(currencyCode: String): String
  }

  input NewCar {
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }  

  type Book {
    id: ID
    isbn: String
    title: String
    authorId: ID
    category: String
    price: Float
    quantity: Int
  }
`;
