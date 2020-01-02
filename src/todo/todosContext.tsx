import React, { useReducer, Context, Dispatch } from 'react';

import { reducer, State, Event } from './reducer';

const initialState: State = { phase: 'init', todos: [] };

export const TodosContext: Context<[State, Dispatch<Event>]> = React.createContext([
  initialState,
  (() => initialState) as React.Dispatch<Event>,
]);

export const TodosReducerProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={[state, dispatch]}>
      {props.children}
    </TodosContext.Provider>
  );
};
