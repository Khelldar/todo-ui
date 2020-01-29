import React, { useCallback, useContext, MutableRefObject, useEffect } from 'react';
import ReactRough from 'react-rough';
import { DispatchContext } from './reducer';
import { Shapes } from './shapes';
import { useSpring, animated } from 'react-spring';

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

  // console.log('whitebard render');
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      // onClick={onClick}
      style={{
        position: 'absolute',
        height: '1000px',
        width: '1000px',
        border: 'black 1px dashed',
      }}
    >
      <animated.svg width={100} height={100} viewBox="0 0 100 100">
        <path
          style={{
            fill: 'none',
          }}
          stroke="black"
          // strokeWidth="1"
          d={` 
         M 0,0 
         q 50,5 ${100},${100}
         `}
        />
      </animated.svg>

      <ReactRough renderer="svg" height={1000} width={1000} ref={svgRef as SvgRef}>
        <svg height={1000} width={1000} ref={svgRef as SvgRef} viewBox="0 0 1000 1000">
          <Shapes />
        </svg>
      </ReactRough>
    </div>
  );
};
