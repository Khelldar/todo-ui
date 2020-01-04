import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';

// const url = 'http://localhost:5000/graphql';
const url = 'https://todo-server-gql.herokuapp.com/graphql';

const client = new GraphQLClient(url, {
  credentials: 'include',
  mode: 'cors',
});

export const sdk = getSdk(client);
