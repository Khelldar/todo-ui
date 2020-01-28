import React, { useContext } from 'react';

import { StateContext, State } from './reducer';

export function useStateSelection<R>(fn: (state: State) => R) {
  const state = useContext(StateContext);
  return fn(state);
}
