import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type CreateUserOutput = {
   __typename?: 'CreateUserOutput',
  user: User,
};

export type LoginUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginUserOutput = {
   __typename?: 'LoginUserOutput',
  user: User,
};

export type LoginWithGoogleInput = {
  code: Scalars['String'],
};

export type LoginWithGoogleOutput = {
   __typename?: 'LoginWithGoogleOutput',
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: CreateUserOutput,
  loginUser: LoginUserOutput,
  loginWithGoogle: LoginWithGoogleOutput,
  logout?: Maybe<Scalars['Boolean']>,
  upsertTodos: UpsertTodosOutput,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationLoginUserArgs = {
  input: LoginUserInput
};


export type MutationLoginWithGoogleArgs = {
  input: LoginWithGoogleInput
};


export type MutationUpsertTodosArgs = {
  input: UpsertTodosInput
};

export type Query = {
   __typename?: 'Query',
  self?: Maybe<User>,
  todos: Array<Todo>,
};

export type Todo = {
   __typename?: 'Todo',
  id: Scalars['ID'],
  text: Scalars['String'],
  completed: Scalars['Boolean'],
  history: Array<Scalars['String']>,
};


export type UpsertTodoInput = {
  id?: Maybe<Scalars['String']>,
  text: Scalars['String'],
  completed: Scalars['Boolean'],
};

export type UpsertTodosInput = {
  upsertTodoInputs: Array<UpsertTodoInput>,
};

export type UpsertTodosOutput = {
   __typename?: 'UpsertTodosOutput',
  _?: Maybe<Scalars['Boolean']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
};

export type LoginUserMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'LoginUserOutput' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type LoginWithGoogleMutationVariables = {
  code: Scalars['String']
};


export type LoginWithGoogleMutation = (
  { __typename?: 'Mutation' }
  & { loginWithGoogle: (
    { __typename?: 'LoginWithGoogleOutput' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpsertTodosMutationVariables = {
  upsertTodoInputs: Array<UpsertTodoInput>
};


export type UpsertTodosMutation = (
  { __typename?: 'Mutation' }
  & { upsertTodos: (
    { __typename?: 'UpsertTodosOutput' }
    & Pick<UpsertTodosOutput, '_'>
  ) }
);

export type SelfQueryVariables = {};


export type SelfQuery = (
  { __typename?: 'Query' }
  & { self: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type TodosQueryVariables = {};


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'text' | 'completed'>
  )> }
);


export const LoginUserDocument = gql`
    mutation loginUser($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password}) {
    user {
      id
      email
    }
  }
}
    `;
export const LoginWithGoogleDocument = gql`
    mutation loginWithGoogle($code: String!) {
  loginWithGoogle(input: {code: $code}) {
    user {
      id
      email
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export const UpsertTodosDocument = gql`
    mutation upsertTodos($upsertTodoInputs: [UpsertTodoInput!]!) {
  upsertTodos(input: {upsertTodoInputs: $upsertTodoInputs}) {
    _
  }
}
    `;
export const SelfDocument = gql`
    query self {
  self {
    id
    email
  }
}
    `;
export const TodosDocument = gql`
    query todos {
  todos {
    id
    text
    completed
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    loginUser(variables: LoginUserMutationVariables): Promise<LoginUserMutation> {
      return client.request<LoginUserMutation>(print(LoginUserDocument), variables);
    },
    loginWithGoogle(variables: LoginWithGoogleMutationVariables): Promise<LoginWithGoogleMutation> {
      return client.request<LoginWithGoogleMutation>(print(LoginWithGoogleDocument), variables);
    },
    logout(variables?: LogoutMutationVariables): Promise<LogoutMutation> {
      return client.request<LogoutMutation>(print(LogoutDocument), variables);
    },
    upsertTodos(variables: UpsertTodosMutationVariables): Promise<UpsertTodosMutation> {
      return client.request<UpsertTodosMutation>(print(UpsertTodosDocument), variables);
    },
    self(variables?: SelfQueryVariables): Promise<SelfQuery> {
      return client.request<SelfQuery>(print(SelfDocument), variables);
    },
    todos(variables?: TodosQueryVariables): Promise<TodosQuery> {
      return client.request<TodosQuery>(print(TodosDocument), variables);
    }
  };
}