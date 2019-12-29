import React, { useEffect, useState, useContext } from 'react';

import { TestComponent } from './Test';
import { CreateUser } from './user/CreateUser';
import { Login } from './user/LoginForm';
import { LogoutButton } from './user/LogoutButton';
import { Todo } from './todo/TodoDisplay';
import { sdk } from './graphql/sdk';
import { TodoList } from './todo/TodoList';
import { CreateTodoForm } from './todo/CreateTodoForm';
import { UserContext } from './userContext';

export const Page: React.FC = () => {
  const [user] = useContext(UserContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    sdk
      .todos()
      .then(data => {
        setTodos(data.todos);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      {!user && <Login />}
      <hr />
      {user && <LogoutButton />}
      <hr />
      <TestComponent />
      <hr />
      <TodoList todos={todos} />
      <hr />
      <CreateTodoForm />
    </div>
  );
};
