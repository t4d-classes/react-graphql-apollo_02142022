import { useQuery, gql } from '@apollo/client';

import { BookISBNList, BookPriceList } from '../components/BookList';

const BOOK_TOOL_QUERY = gql`
  ${BookISBNList.fragments.books}
  ${BookPriceList.fragments.books}
  query BookTool {
    isbnBooks: books {
      ...BookISBNListBooks
    }
    priceBooks: books {
      ...BookPriceListBooks
    }
  }
`;



export const useBookTool = () => {

  const { loading, error, data } = useQuery(BOOK_TOOL_QUERY);

  return {
    loading,
    error,
    books: {
      isbnList: data?.isbnBooks ?? [],
      priceList: data?.priceBooks ?? [],
    },
  };

};