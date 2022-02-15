import { useState } from 'react';

import { ColorTool } from './components/ColorTool';
import { BookTool } from './components/BookTool';
import { CarTool } from './components/CarTool';


function App() {

  const [ activeTool, setActiveTool ] = useState('color-tool');

  let ActiveToolComp;

  switch (activeTool) {
    case 'book-tool':
      ActiveToolComp = BookTool;
      break;
    case 'car-tool':
      ActiveToolComp = CarTool;
      break;
    default:
      ActiveToolComp = ColorTool;
      break;
  }


  return (
    <>
      <select value={activeTool}
        onChange={e => setActiveTool(e.target.value)}>
        <option value="color-tool">Color Tool</option>
        <option value="book-tool">Book Tool</option>
        <option value="car-tool">Car Tool</option>
      </select>
      <ActiveToolComp />
    </>
  );

}

export default App;
