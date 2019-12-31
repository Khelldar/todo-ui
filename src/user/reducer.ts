import { User } from '../generated/sdk';
import { setToken, removeTokenFromStorage } from '../token';

export interface LoggedIn {
  type: 'LoggedIn';
  payload: {
    user: User;
    token: string;
  };
}

//this event fires when the user comes back to the app and we find a token in local storage
export interface Resumed {
  type: 'Resumed';
  payload: {
    user: User;
    token: string;
  };
}

export interface LoggedOut {
  type: 'LoggedOut';
}

export type Action = LoggedIn | Resumed | LoggedOut;

export interface State {
  state: 'init' | 'notLoggedIn' | 'loggedIn';
  user?: User;
  token?: string;
}

export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LoggedIn':
      //Erin - setting state outside of react feels pretty wrong. is it?  what's a better way?
      setToken(action.payload.token);
      return {
        state: 'loggedIn',
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'Resumed':
      return {
        state: 'loggedIn',
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LoggedOut':
      removeTokenFromStorage();
      return { state: 'notLoggedIn' };
    default:
      return state;
  }
};
