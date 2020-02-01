import React, { useState, MutableRefObject } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactRough, { Rectangle } from 'react-rough';
import { useGesture } from 'react-with-gesture';

type SvgRef = MutableRefObject<SVGSVGElement>;

export const Shape: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>();
  return (
    <ReactRough renderer="svg" height={100} width={100} ref={svgRef as SvgRef}>
      <svg
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={svgRef as SvgRef}
        viewBox="0 0 100 100"
      >
        <Rectangle x={1} y={1} width={98} height={98} seed={123} />
      </svg>
    </ReactRough>
  );
};

interface MovableShapeProps {
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
}

export const MovableShape: React.FC<MovableShapeProps> = ({
  initialX = 0,
  initialY = 0,
  initialWidth = 100,
  initialHeight = 100,
}) => {
  const [springState, set] = useSpring(() => ({
    x: initialX,
    y: initialY,
    width: initialWidth,
    height: initialHeight,
    immediate: true,
  }));

  const bindMove = useGesture(({ args, local }) => {
    const [initX, initY] = args[0].init;
    const [x, y] = local;
    set({ x: initX + x, y: initY + y });
  });

  const bindResize = useGesture(({ args, local, event }) => {
    const [initWidth, initHeight] = args[0].init;
    const [width, height] = local;
    const v = (initWidth + width + (height + initHeight)) / 2;
    set({ width: v, height: v });
  });

  return (
    // position
    <animated.div
      style={{
        position: 'absolute',
        left: springState.x.interpolate(x => `${x}px`),
        top: springState.y.interpolate(y => `${y}px`),
        // border: '1px solid red',
      }}
    >
      {/* size */}
      <animated.div
        style={{
          width: springState.width.interpolate(v => `${v}px`),
          height: springState.height.interpolate(v => `${v}px`),
        }}
      >
        <div
          {...bindMove({ init: [initialX, initialY] })}
          style={
            {
              // border: '1px solid blue',
            }
          }
        >
          <Shape />
        </div>
      </animated.div>
      <div
        {...bindResize({ init: [initialWidth, initialHeight] })}
        style={{
          position: 'absolute',
          right: '0px',
          bottom: '0px',
          backgroundColor: 'black',
          width: '15px',
          height: '15px',
        }}
      ></div>
    </animated.div>
  );
};

export const Board: React.FC = () => {
  return (
    <div style={{ border: '1px solid blue' }}>
      <MovableShape />
      <MovableShape />
      <MovableShape />
    </div>
  );
};
// const AnimatedShape = animated(Shape);

// export const Toggle: React.FC = () => {
//   const [isToggled, setIsToggled] = useState(false);
//   const [position, setPosition] = useState({ x: 100, y: 0 });
//   const { color, y, x } = useSpring({
//     color: isToggled ? 'white' : 'blue',
//     // y: isToggled ? 0 : -50,
//     x: position.x,
//     y: position.y,
//   });

//   return (
//     <div
//       style={{ border: '1px solid blue' }}
//       onMouseMove={e => setPosition({ x: e.pageX, y: e.pageY })}
//     >
//       <MovableShape />
//       <animated.h1
//         style={{
//           color,
//           transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
//         }}
//       >
//         Hello
//       </animated.h1>
//       <button onClick={() => setIsToggled(!isToggled)}>toggle</button>
//       <div style={{}}>{JSON.stringify(isToggled)}</div>

//       {/* <animated.div
//         // onClick={() => setPosition({ x: position.x + 10, y: position.y + 10 })}

//         style={{
//           position: 'absolute',
//           left: x.interpolate(x => `${x}px`),
//           top: y.interpolate(y => `${y}px`),
//           width: '100px',
//           height: '100px',
//           // border: '1px solid red',
//         }}
//       >
//         <MovableShape />
//       </animated.div> */}
//     </div>
//   );
// };
