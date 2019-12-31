import React, { useEffect, useState } from 'react';

import { LogoutButton } from '../user/LogoutButton';
import { Todo } from '../todo/TodoDisplay';
import { sdk } from '../graphql/sdk';
import { TodoList } from '../todo/TodoList';
import { CreateTodoForm } from '../todo/CreateTodoForm';

export const TodosPage: React.FC = () => {
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
      <LogoutButton />
      <hr />
      <TodoList todos={todos} />
      <hr />
      <CreateTodoForm />
    </div>
  );
};
