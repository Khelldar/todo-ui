import React, { useContext } from 'react';
import { Rectangle } from 'react-rough';
import { StateContext } from './reducer';
// import Draggable from 'react-draggable';

export interface Props {}

export const Shape: React.FC<Props> = props => {
  const state = useContext(StateContext);
  console.log('shape render');
  return (
    <Rectangle
      x={state.shape.x}
      y={state.shape.y}
      width={state.shape.width}
      height={state.shape.height}
      seed={123}
    />
  );
};
