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
  accessToken: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: CreateUserOutput,
  loginUser: LoginUserOutput,
  upsertTodos: UpsertTodosOutput,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationLoginUserArgs = {
  input: LoginUserInput
};


export type MutationUpsertTodosArgs = {
  input: UpsertTodosInput
};

export type Query = {
   __typename?: 'Query',
  todos: Array<Todo>,
  test?: Maybe<Test>,
};

export type Test = {
   __typename?: 'Test',
  a?: Maybe<Scalars['String']>,
  b?: Maybe<Scalars['String']>,
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
    & Pick<LoginUserOutput, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
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

export type TestQueryVariables = {};


export type TestQuery = (
  { __typename?: 'Query' }
  & { test: Maybe<(
    { __typename?: 'Test' }
    & Pick<Test, 'a' | 'b'>
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
    accessToken
  }
}
    `;
export const UpsertTodosDocument = gql`
    mutation upsertTodos($upsertTodoInputs: [UpsertTodoInput!]!) {
  upsertTodos(input: {upsertTodoInputs: $upsertTodoInputs}) {
    _
  }
}
    `;
export const TestDocument = gql`
    query test {
  test {
    a
    b
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
    upsertTodos(variables: UpsertTodosMutationVariables): Promise<UpsertTodosMutation> {
      return client.request<UpsertTodosMutation>(print(UpsertTodosDocument), variables);
    },
    test(variables?: TestQueryVariables): Promise<TestQuery> {
      return client.request<TestQuery>(print(TestDocument), variables);
    },
    todos(variables?: TodosQueryVariables): Promise<TodosQuery> {
      return client.request<TodosQuery>(print(TodosDocument), variables);
    }
  };
}