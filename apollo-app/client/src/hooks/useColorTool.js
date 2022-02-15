import { useQuery, gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { ColorList } from '../components/ColorList';

const COLOR_TOOL_QUERY = gql`
  ${ColorList.fragments.colors}
  query ColorTool {
    colors {
      ...ColorListColors
    }
  }
`;

const APPEND_COLOR_MUTATION = gql`
  mutation AppendColor($newColor: NewColor) {
    appendColor(color: $newColor) {
      id
      name
      hexcode
    }
  }
`;

export const useColorTool = () => {

  const { loading, error, data } = useQuery(COLOR_TOOL_QUERY);
  const [ mutateAppendColor ] = useMutation(APPEND_COLOR_MUTATION);

  const addColor = useCallback(color => {
    return mutateAppendColor({
      variables: {
        newColor: color,
      },
      refetchQueries: [ { query: COLOR_TOOL_QUERY } ],
    });
  }, [mutateAppendColor]);

  return {
    loading,
    error,
    colors: data?.colors ?? [],
    addColor,
  }
};