import React from 'react';

import { UserProvider } from './userContext';
import { AppRouter } from './AppRouter';

//not doing much other than setting up some top level context providers
const App: React.FC = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default App;
