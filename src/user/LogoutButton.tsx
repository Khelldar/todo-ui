import React, { useContext, useCallback } from 'react';
import { UserContext } from './userContext';
import { sdk } from '../graphql/sdk';

export const LogoutButton: React.FC = () => {
  const [, dispatch] = useContext(UserContext);

  const onClick = useCallback(() => {
    sdk.logout();
    dispatch({ type: 'LoggedOut' });
  }, [dispatch]);

  return <button onClick={onClick}>log out</button>;
};
