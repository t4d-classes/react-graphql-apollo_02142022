import { useFlightTool } from '../hooks/useFlightTool';


export const FlightTool = () => {

  const {
    loading, error, flights, currentPage, pageLength,
    previousPage, nextPage, updatePageLength,
  } = useFlightTool();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <>
      <header>
        <h1>Flight Tool</h1>
      </header>
      <ul>
        {flights.map(flight => <li key={flight.id}>
          {flight.tailNum},
          origin: {flight.origin},
          destination: {flight.destination}
        </li>)}
      </ul>
      <form>
        <fieldset className="pagination">
          <span>
            Page Length:
            <select value={pageLength} onChange={updatePageLength}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </span>
          <button type="button" onClick={previousPage}
            disabled={currentPage < 2}>&lt;</button>
          <button type="button" onClick={nextPage}>&gt;</button>
          <span>
            Page {currentPage}
          </span>
        </fieldset>
      </form>
    </>
  )

};