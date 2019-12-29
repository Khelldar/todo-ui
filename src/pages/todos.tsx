import React, { useEffect, useState, useContext } from 'react';

import { TestComponent } from '../Test';
import { LogoutButton } from '../user/LogoutButton';
import { Todo } from '../todo/TodoDisplay';
import { sdk } from '../graphql/sdk';
import { TodoList } from '../todo/TodoList';
import { CreateTodoForm } from '../todo/CreateTodoForm';
import { UserContext } from '../userContext';
import { Redirect } from 'react-router-dom';

export const TodosPage: React.FC = () => {
  const [user] = useContext(UserContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!user) return;

    sdk
      .todos()
      .then(data => {
        setTodos(data.todos);
      })
      .catch(console.log);
  }, [user]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <LogoutButton />
      <hr />
      <TestComponent />
      <hr />
      <TodoList todos={todos} />
      <hr />
      <CreateTodoForm />
    </div>
  );
};
