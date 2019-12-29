import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';
import { getToken } from '../token';

const url = 'https://todo-server-gql.herokuapp.com/graphql';

const client = new GraphQLClient(url, {
  headers: {
    'x-token': getToken() || '',
  },
});

export const sdk = getSdk(client);
