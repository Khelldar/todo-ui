import React, { useReducer, Context, Dispatch } from 'react';

import { reducer, State, Action } from './reducer';

const initialState: State = { state: 'init', todos: [] };

export const TodosContext: Context<[State, Dispatch<Action>]> = React.createContext([
  initialState,
  (() => {}) as React.Dispatch<Action>,
]);

export const TodosReducerProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={[state, dispatch]}>
      {props.children}
    </TodosContext.Provider>
  );
};
