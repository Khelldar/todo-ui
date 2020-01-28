import React, { useCallback, useContext } from 'react';
import ReactRough from 'react-rough';
import { DispatchContext } from './reducer';
import { Shapes } from './shapes';

export const WhiteBoard: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      dispatch({
        type: 'MouseUp',
        payload: {
          x: e.pageX,
          y: e.pageY,
        },
      });
    },
    [dispatch]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dispatch({
        type: 'MouseDown',
        payload: {
          x: e.pageX,
          y: e.pageY,
        },
      });
    },
    [dispatch]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      dispatch({
        type: 'MouseMove',
        payload: {
          x: e.pageX,
          y: e.pageY,
        },
      });
    },
    [dispatch]
  );

  console.log('whitebard render');
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      style={{
        position: 'absolute',
        height: '1000px',
        width: '1000px',
        border: 'red 1px solid',
      }}
    >
      <ReactRough renderer="svg" height={1000} width={1000}>
        <Shapes />
      </ReactRough>
    </div>
  );
};
