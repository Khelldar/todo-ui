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
  shape: Shape;
}

const initialState: State = {
  shape: {
    dragging: null,
    x: 15,
    y: 15,
    width: 100,
    height: 100,
  },
};

interface Shape {
  dragging: null | {
    offsetX: number;
    offsetY: number;
  };
  x: number;
  y: number;
  width: number;
  height: number;
}

export const reducer = (state: State, event: Event): State => {
  switch (event.type) {
    case 'MouseDown':
      const { x, y } = event.payload;
      const { shape } = state;
      if (
        !(
          x > shape.x &&
          x < shape.x + shape.width &&
          y > shape.y &&
          y < shape.y + shape.height
        )
      ) {
        return state;
      }

      const offsetX = x - shape.x;
      const offsetY = y - shape.y;

      return {
        ...state,
        shape: {
          ...state.shape,
          x: x - offsetX,
          y: y - offsetY,
          dragging: {
            offsetX,
            offsetY,
          },
        },
      };
    case 'MouseUp':
      return {
        ...state,
        shape: {
          ...state.shape,
          dragging: null,
        },
      };
    case 'MouseMove':
      if (!state.shape.dragging) return state;
      return {
        ...state,
        shape: {
          ...state.shape,
          x: event.payload.x - state.shape.dragging.offsetX,
          y: event.payload.y - state.shape.dragging.offsetY,
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

  console.log('ReducerProvider render');
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
