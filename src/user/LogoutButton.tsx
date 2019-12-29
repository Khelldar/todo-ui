import React, { useContext } from 'react';
import { UserContext } from '../userContext';

export const LogoutButton: React.FC = () => {
  const [_, setUser] = useContext(UserContext);

  return <button onClick={() => setUser(null)}>log out</button>;
};
