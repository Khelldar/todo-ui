import React, { useContext } from 'react';

import { Login } from '../user/LoginForm';

import { UserContext } from '../userContext';
import { Redirect } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [user] = useContext(UserContext);

  if (user) {
    return <Redirect to="/todos" />;
  }

  return (
    <div>
      <h1>login page</h1>
      <Login />
    </div>
  );
};
