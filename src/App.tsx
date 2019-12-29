import React from 'react';
import { UserProvider } from './userContext';

import { Page } from './Page';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Page></Page>
    </UserProvider>
  );
};

export default App;
