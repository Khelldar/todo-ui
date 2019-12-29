import React, { useContext, useCallback } from 'react';
import { UserContext } from '../userContext';
import { removeToken } from '../token';

export const LogoutButton: React.FC = () => {
  const [, setUser] = useContext(UserContext);

  const onClick = useCallback(() => {
    setUser(null);
    removeToken();
  }, [setUser]);

  return <button onClick={onClick}>log out</button>;
};
