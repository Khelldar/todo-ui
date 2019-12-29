import React from 'react';
import { Todo, TodoDisplay } from './TodoDisplay';

export interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;
  return (
    <ul>
      {todos.map(todo => (
        <TodoDisplay todo={todo}></TodoDisplay>
      ))}
    </ul>
  );
};
