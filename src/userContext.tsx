import { User } from './generated/sdk';
import React, { useState, useEffect } from 'react';
import { getToken, removeToken } from './token';
import * as jwt from 'jsonwebtoken';

export const UserContext = React.createContext<
  [User | null, (user: User | null) => void]
>([null, () => {}]);

export const UserProvider: React.FC = props => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    //TODO: better error handling
    try {
      const claims = jwt.decode(token) as any;
      if (claims.id && claims.email) {
        setUser(claims);
      }
    } catch (e) {
      //if there's some error, remove the user/token to get into a fresh state
      console.log(e);
      setUser(null);
      removeToken();
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>
  );
};
