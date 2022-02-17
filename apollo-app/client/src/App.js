import { useReactiveVar, useQuery, gql } from '@apollo/client';

import { activeToolVar } from './vars';

import { ColorTool } from './components/ColorTool';
import { BookTool } from './components/BookTool';
import { CarTool } from './components/CarTool';
import { FlightTool } from './components/FlightTool';


const APP_QUERY = gql`
  query App {
    activeTool @client
  }
`;


function App() {

  // const activeTool = useReactiveVar(activeToolVar);

  const { data: { activeTool } } = useQuery(APP_QUERY);

  let ActiveToolComp;

  switch (activeTool) {
    case 'book-tool':
      ActiveToolComp = BookTool;
      break;
    case 'car-tool':
      ActiveToolComp = CarTool;
      break;
    case 'flight-tool':
      ActiveToolComp = FlightTool;
      break;      
    default:
      ActiveToolComp = ColorTool;
      break;
  }


  return (
    <>
      <select value={activeTool}
        onChange={e => activeToolVar(e.target.value)}>
        <option value="color-tool">Color Tool</option>
        <option value="book-tool">Book Tool</option>
        <option value="car-tool">Car Tool</option>
        <option value="flight-tool">Flight Tool</option>        
      </select>
      <ActiveToolComp />
    </>
  );

}

export default App;
