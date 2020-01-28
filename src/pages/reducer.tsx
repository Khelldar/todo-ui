import React, { useReducer, useMemo } from 'react';

export interface MouseDown {
  type: 'MouseDown';
  payload: {
    x: number;
    y: number;
  };
}

export interface MouseUp {
  type: 'MouseUp';
  payload: {
    x: number;
    y: number;
  };
}

export interface MouseMove {
  type: 'MouseMove';
  payload: {
    x: number;
    y: number;
  };
}

export interface TodoCreated {
  type: 'TodoCreated';
  payload: {
    x: number;
    y: number;
  };
}

export type Event = MouseDown | MouseUp | MouseMove;

export interface State {
  shapes: Record<string, Shape>;
}

const initialState: State = {
  shapes: {
    '123': {
      id: '123',
      dragging: null,
      x: 15,
      y: 15,
      width: 100,
      height: 100,
    },
    '456': {
      id: '456',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '789': {
      id: '789',
      dragging: null,
      x: 400,
      y: 400,
      width: 100,
      height: 100,
    },
    '1': {
      id: '1',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '2': {
      id: '2',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '3': {
      id: '3',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '4': {
      id: '4',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '5': {
      id: '5',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '6': {
      id: '6',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '7': {
      id: '7',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '9': {
      id: '9',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '11': {
      id: '11',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '12': {
      id: '12',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '13': {
      id: '13',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    '14': {
      id: '14',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    asd: {
      id: 'asd',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    as: {
      id: 'as',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
    qw: {
      id: 'qw',
      dragging: null,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
  },
};

interface Shape {
  id: string;
  dragging: null | {
    offsetX: number;
    offsetY: number;
  };
  x: number;
  y: number;
  width: number;
  height: number;
}

function isInside(x: number, y: number, shape: Shape) {
  return (
    x > shape.x && x < shape.x + shape.width && y > shape.y && y < shape.y + shape.height
  );
}

function objectMap(obj: Object, fn: any) {
  return Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
}

export const reducer = (state: State, event: Event): State => {
  switch (event.type) {
    case 'MouseDown':
      const { x, y } = event.payload;
      const shape = Object.values(state.shapes).find(shape => isInside(x, y, shape));

      if (!shape) {
        return state;
      }

      const offsetX = x - shape.x;
      const offsetY = y - shape.y;

      return {
        ...state,
        shapes: {
          ...state.shapes,
          [shape.id]: {
            ...shape,
            x: x - offsetX,
            y: y - offsetY,
            dragging: {
              offsetX,
              offsetY,
            },
          },
        },
      };
    case 'MouseUp':
      return {
        ...state,
        shapes: objectMap(state.shapes, (shape: Shape) => ({ ...shape, dragging: null })),
      };
    case 'MouseMove':
      const draggingShape = Object.values(state.shapes).find(shape => shape.dragging);
      if (!draggingShape) return state;

      return {
        ...state,
        shapes: {
          ...state.shapes,
          [draggingShape.id]: {
            ...draggingShape,
            x: event.payload.x - draggingShape.dragging!.offsetX,
            y: event.payload.y - draggingShape.dragging!.offsetY,
          },
        },
      };
    default:
      return state;
  }
};

// const initialContext = [
//   initialState,
//   (() => initialState) as React.Dispatch<Event>,
// ] as const;

/*TODO: split up this context into two providers
  this will allow dispatch to be passed around but it will never cause a rerender
  state will cause rerenders every time though


  Also consider using https://www.npmjs.com/package/react-use-gesture?activeTab=readme for animations
*/

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(
  (() => initialState) as React.Dispatch<Event>
);

export const ReducerProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log({ state });
  // console.log('ReducerProvider render');
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
