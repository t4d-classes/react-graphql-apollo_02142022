import { useColorTool } from '../hooks/useColorTool';

import { ColorList } from './ColorList';
import { ColorForm } from './ColorForm';


export const ColorTool = () => {

  const { loading, error, colors, addColor } = useColorTool();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <ColorList colors={colors} />
      <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
    </>
  );

};