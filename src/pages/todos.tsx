import React, { useEffect, useContext } from 'react';

import { LogoutButton } from '../user/LogoutButton';
import { TodoList } from '../todo/TodoList';
import { CreateTodoForm } from '../todo/CreateTodoForm';
import { SdkContext } from '../sdkContext';
import { TodosContext } from '../todo/todosContext';

export const TodosPage: React.FC = () => {
  const sdk = useContext(SdkContext);
  const [state, publish] = useContext(TodosContext);

  useEffect(() => {
    publish({ type: 'TodosRequested' });
    sdk
      .todos()
      .then(data => {
        publish({
          type: 'TodosReceived',
          payload: {
            todos: data.todos,
          },
        });
      })
      .catch(e => {
        console.log(e);
        publish({
          type: 'ErrorLoading',
          payload: {
            message:
              'there was an error loading todos. check console for full error or try refreshing the page',
          },
        });
      });
  }, [sdk, publish]);

  return (
    <div>
      <LogoutButton />
      <hr />

      {state.state === 'loading' && <div>loading...</div>}
      {state.state === 'loaded' && <TodoList todos={state.todos} />}
      {state.state === 'error' && <div>{state.errorMessage}</div>}
      <hr />
      <CreateTodoForm />
    </div>
  );
};
