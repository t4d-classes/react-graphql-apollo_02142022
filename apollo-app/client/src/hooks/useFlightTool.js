import { useQuery, gql, makeVar, useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';

const currentPageVar = makeVar(1);
const pageLengthVar = makeVar(10);
const maxPageLength = 20;

export const FLIGHT_TOOL_QUERY = gql`
  query FlightTool($offset: Int, $limit: Int) {
    flights(offset: $offset, limit: $limit) {
      id
      tailNum
      origin
      destination      
    }
  }
`;

export const useFlightTool = () => {

  const currentPage = useReactiveVar(currentPageVar);
  const pageLength = useReactiveVar(pageLengthVar);

  const { loading, error, data, fetchMore, client } = useQuery(
    FLIGHT_TOOL_QUERY,
    { variables: { offset: 0, limit: maxPageLength }});

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      currentPageVar(currentPage - 1);
    }
  }, [currentPage]);

  const nextPage = useCallback(async () => {

    const { flights } = client.readQuery(
      { query: gql`query Flights { flights { id } }` });

    const nextPageOffset = currentPage * pageLength;

    console.log('flights length: ' + flights.length + ', pages: ' + flights.length / pageLength);
    
    if (flights.length <= nextPageOffset) {
      
      console.log('loading more: nextPage=' + (currentPage + 1) + ', offset=' + nextPageOffset + ', limit=' + maxPageLength);
      await fetchMore({ variables: { offset: nextPageOffset } });
    
    } else {
      
      console.log('we have enough flight data: nextPage=' + (currentPage + 1) + ', offset=' + nextPageOffset + ', limit=' + maxPageLength);
    }

    currentPageVar(currentPage + 1);
  
  }, [currentPage, pageLength, fetchMore, client]);

  const updatePageLength = useCallback(e => {
    pageLengthVar(Number(e.target.value));
    currentPageVar(1);
  }, []);

  const start = (currentPage - 1) * pageLength;
  const end =start + pageLength;

  return {
    loading,
    error,
    flights: (data?.flights ?? []).slice(start, end),
    currentPage,
    pageLength,
    previousPage,
    nextPage,
    updatePageLength,
  };  


};