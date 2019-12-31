import React from 'react';

import { UserProvider } from './user/userContext';
import { AppRouter } from './AppRouter';
import { SdkProvider } from './sdkContext';

//not doing much other than setting up some top level context providers
const App: React.FC = () => {
  return (
    <UserProvider>
      <SdkProvider>
        <AppRouter />
      </SdkProvider>
    </UserProvider>
  );
};

export default App;
