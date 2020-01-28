import React, { useCallback, useContext, MutableRefObject, useEffect } from 'react';
import ReactRough from 'react-rough';
import { DispatchContext } from './reducer';
import { Shapes } from './shapes';

type SvgRef = MutableRefObject<SVGSVGElement>;

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

  const svgRef = React.useRef<SVGSVGElement>();

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
        border: 'black 1px dashed',
      }}
    >
      {/* <svg viewBox="0 0 1000 1000">
        <path
          style={{
            fill: 'none',
          }}
          stroke="black"
          // strokeWidth="1"
          d=" 
         M 50,50 
         q 150,5 100, 100

         "
        />
      </svg> */}

      <ReactRough renderer="svg" height={1000} width={1000} ref={svgRef as SvgRef}>
        <svg height={1000} width={1000} ref={svgRef as SvgRef} viewBox="0 0 1000 1000">
          <Shapes />
        </svg>
      </ReactRough>
    </div>
  );
};
