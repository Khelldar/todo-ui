import React, { useState, MutableRefObject } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactRough, { Rectangle } from 'react-rough';

type SvgRef = MutableRefObject<SVGSVGElement>;
interface ShapeProps {
  x?: number;
  y?: number;
}
export const Shape: React.FC<ShapeProps> = ({ x = 0, y = 0 }) => {
  const svgRef = React.useRef<SVGSVGElement>();
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <ReactRough renderer="svg" height={100} width={100} ref={svgRef as SvgRef}>
        <svg
          style={{
            width: '100%',
            height: '100%',
          }}
          ref={svgRef as SvgRef}
          // viewBox="0 0 100 100"
        >
          <Rectangle x={0} y={0} width={100} height={100} seed={123} />
          {/* <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /> */}
        </svg>
      </ReactRough>
    </div>
  );
};

const AnimatedShape = animated(Shape);

export const Toggle: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const { color, y, x } = useSpring({
    color: isToggled ? 'white' : 'blue',
    // y: isToggled ? 0 : -50,
    x: position.x,
    y: position.y,
  });

  return (
    <div
      style={{ border: '1px solid blue' }}
      onMouseMove={e => setPosition({ x: e.pageX, y: e.pageY })}
    >
      <animated.h1
        style={{
          color,
          transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
        }}
      >
        Hello
      </animated.h1>
      <button onClick={() => setIsToggled(!isToggled)}>toggle</button>
      <div style={{}}>{JSON.stringify(isToggled)}</div>

      <animated.div
        // onClick={() => setPosition({ x: position.x + 10, y: position.y + 10 })}

        style={{
          position: 'absolute',
          left: x.interpolate(x => `${x}px`),
          top: y.interpolate(y => `${y}px`),
          width: '100px',
          height: '100px',
          border: '1px solid red',
        }}
      >
        <AnimatedShape />
      </animated.div>
    </div>
  );
};
