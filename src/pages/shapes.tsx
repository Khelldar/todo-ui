import React, { useState, useContext } from 'react';
import { Shape } from './shape';
import { StateContext } from './reducer';

export const Shapes: React.FC = () => {
  const state = useContext(StateContext);

  console.log('shapes render');
  return (
    <>
      {/* {ids.map(id => (
        <Shape key={id} id={id}></Shape>
      ))} */}
      {Object.values(state.shapes).map(shape => (
        <Shape key={shape.id} {...shape} />
      ))}
    </>
  );
};
