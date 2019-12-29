import React from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Props {
  todo: Todo;
}

export const TodoDisplay: React.FC<Props> = props => {
  const { text } = props.todo;

  return <div>{text}</div>;
};
