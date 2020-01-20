import React, { useEffect, useContext, useState } from 'react';
import { Drawer, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { LogoutButton } from '../user/LogoutButton';
import { TodoList } from '../todo/TodoList';
import { CreateTodoForm } from '../todo/CreateTodoForm';
import { TodosContext } from '../todo/todosContext';
import { sdk } from '../graphql/sdk';

export const TodosPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
  }, [publish]);

  return (
    <div>
      <Grid container>
        <Grid item xs={10}>
          <h1>Todos</h1>
        </Grid>
        <Grid item xs={2}>
          <MenuIcon fontSize="large" onClick={() => setDrawerOpen(true)} />
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <LogoutButton />
            <hr />
          </Drawer>
        </Grid>
      </Grid>

      {state.phase === 'loading' && <div>loading...</div>}
      {state.phase === 'loaded' && <TodoList todos={state.todos} />}
      {state.phase === 'error' && <div>{state.errorMessage}</div>}
      <hr />
      <CreateTodoForm />
    </div>
  );
};
