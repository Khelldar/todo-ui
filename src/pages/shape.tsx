import React, { useMemo, useContext } from 'react';
import { StateContext } from './reducer';
import { SimpleShape } from './SimpleShape';
import { useStateSelection } from './useStateSelection';
// import { StateContext } from './reducer';
// import Draggable from 'react-draggable';

export interface Props {
  id: string;
  //   x: number;
  //   y: number;
  //   width: number;
  //   height: number;
}

export const Shape: React.FC<Props> = props => {
  //   const shape = useStateSelection(state => state.shapes[props.id]);
  const state = useContext(StateContext);
  const shape = state.shapes[props.id];

  console.log(`shape render ${props.id}`);
  return <SimpleShape {...shape} />;
};
