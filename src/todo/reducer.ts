import { Todo as FullTodo } from '../generated/sdk';

type Todo = Pick<FullTodo, 'id' | 'text' | 'completed'>;

export interface TodosRequested {
  type: 'TodosRequested';
}

export interface TodosReceived {
  type: 'TodosReceived';
  payload: {
    todos: Todo[];
  };
}

export interface ErrorLoading {
  type: 'ErrorLoading';
  payload: {
    message: string;
  };
}

export interface TodoCreated {
  type: 'TodoCreated';
  payload: {
    todo: Todo;
  };
}

export interface TodoCreateActuallyFailed {
  type: 'TodoCreateActuallyFailed';
  payload: {
    todo: Todo;
  };
}

export type Event =
  | TodosRequested
  | TodosReceived
  | ErrorLoading
  | TodoCreated
  | TodoCreateActuallyFailed;

export interface State {
  phase: 'init' | 'loading' | 'loaded' | 'error';
  todos: Todo[];
  errorMessage?: string;
}

export const reducer = (state: State, event: Event): State => {
  switch (event.type) {
    case 'TodosRequested':
      return {
        ...state,
        phase: 'loading',
      };
    case 'TodosReceived':
      return {
        phase: 'loaded',
        todos: event.payload.todos,
      };
    case 'ErrorLoading':
      return {
        ...state,
        phase: 'error',
        errorMessage: event.payload.message,
      };
    case 'TodoCreated':
      return {
        ...state,
        todos: [...state.todos, event.payload.todo],
      };
    case 'TodoCreateActuallyFailed':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== event.payload.todo.id),
      };
    default:
      return state;
  }
};
