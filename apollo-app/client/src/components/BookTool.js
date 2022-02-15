import { useBookTool } from '../hooks/useBookTool';

import { BookISBNList, BookPriceList } from './BookList';


export const BookTool = () => {

  const { loading, error, books } = useBookTool();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <BookISBNList books={books.isbnList} />
      <BookPriceList books={books.priceList} />
    </>
  );

};