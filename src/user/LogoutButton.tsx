import React, { useContext, useCallback } from 'react';
import { UserContext } from './userContext';

export const LogoutButton: React.FC = () => {
  const [, dispatch] = useContext(UserContext);

  const onClick = useCallback(() => {
    dispatch({ type: 'LoggedOut' });
  }, [dispatch]);

  return <button onClick={onClick}>log out</button>;
};
