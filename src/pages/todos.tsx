import React, { useEffect, useState, useContext } from 'react';

import { LogoutButton } from '../user/LogoutButton';
import { Todo } from '../todo/TodoDisplay';
import { TodoList } from '../todo/TodoList';
import { CreateTodoForm } from '../todo/CreateTodoForm';
import { SdkContext } from '../sdkContext';

export const TodosPage: React.FC = () => {
  const sdk = useContext(SdkContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    sdk
      .todos()
      .then(data => {
        setTodos(data.todos);
      })
      .catch(console.log);
  }, [sdk]);

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
