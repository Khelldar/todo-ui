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

export type Action =
  | TodosRequested
  | TodosReceived
  | ErrorLoading
  | TodoCreated
  | TodoCreateActuallyFailed;

export interface State {
  state: 'init' | 'loading' | 'loaded' | 'error';
  todos: Todo[];
  errorMessage?: string;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TodosRequested':
      return {
        ...state,
        state: 'loading',
      };
    case 'TodosReceived':
      return {
        state: 'loaded',
        todos: action.payload.todos,
      };
    case 'ErrorLoading':
      return {
        ...state,
        state: 'error',
        errorMessage: action.payload.message,
      };
    case 'TodoCreated':
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    case 'TodoCreateActuallyFailed':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.todo.id),
      };
    default:
      return state;
  }
};
