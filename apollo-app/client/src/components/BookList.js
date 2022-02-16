import { gql } from '@apollo/client';

export const BookISBNList = ({ books }) => {
  return (
    <ul>
      {books.map(book => <li key={book.id}>
        {book.title} {book.isbn} {book.category}
      </li>)}
    </ul>
  );
}

BookISBNList.fragments = {
  books: gql`
    fragment BookISBNListBooks on Book {
      id
      title
      isbn
      category
    }
  ` 
};

export const BookPriceList = ({ books }) => {
  return (
    <ul>
      {books.map(book => <li key={book.id}>
        {book.title} {book.price}
      </li>)}
    </ul>
  );
}

BookPriceList.fragments = {
  books: gql`
    fragment BookPriceListBooks on Book {
      id
      title
      price
    }
  ` 
};