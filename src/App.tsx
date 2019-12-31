import React from 'react';

import { UserProvider } from './user/userContext';
import { AppRouter } from './AppRouter';
import { SdkProvider } from './sdkContext';
import { TodosReducerProvider } from './todo/todosContext';

//not doing much other than setting up some top level context providers
const App: React.FC = () => {
  return (
    <UserProvider>
      <SdkProvider>
        {/* the TodosReducerProvider should probably live at a lower level you'll probably
        need to introduce a new level in between the TodoPage and TodoList where the page
        adds the TodosReducerProvider and then something before the list uses it
        it's easy enough just to put it at the top level for now. */}
        <TodosReducerProvider>
          <AppRouter />
        </TodosReducerProvider>
      </SdkProvider>
    </UserProvider>
  );
};

export default App;
