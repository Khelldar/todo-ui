import React, { useReducer, useMemo } from 'react';

import { reducer, State, Event } from './reducer';

const initialState: State = { phase: 'init', todos: [] };
const initialContext = [
  initialState,
  (() => initialState) as React.Dispatch<Event>,
] as const;

export const TodosContext = React.createContext(initialContext);

export const TodosReducerProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return [state, dispatch] as const;
  }, [state, dispatch]);

  return <TodosContext.Provider value={value}>{props.children}</TodosContext.Provider>;
};
