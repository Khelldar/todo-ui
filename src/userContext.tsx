import React, { useEffect, useReducer, Context, Dispatch } from 'react';
import { getTokenFromStorage } from './token';
import * as jwt from 'jsonwebtoken';
import { userReducer, State, Action } from './userReducer';

const initialState: State = { state: 'init' };

export const UserContext: Context<[State, Dispatch<Action>]> = React.createContext([
  initialState,
  (() => {}) as React.Dispatch<Action>,
]);

export const UserProvider: React.FC = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    const token = getTokenFromStorage();
    if (!token) {
      dispatch({ type: 'LoggedOut' });
      return;
    }

    //TODO: better error handling
    try {
      const claims = jwt.decode(token) as any;
      if (claims.id && claims.email) {
        dispatch({ type: 'LoggedIn', payload: { user: claims, token } });
      }
    } catch (e) {
      //if there's some error, try to get into a fresh state
      console.log(e);
      dispatch({ type: 'LoggedOut' });
    }
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
