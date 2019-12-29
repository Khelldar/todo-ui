import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';
import { getToken } from '../token';

const client = new GraphQLClient('http://localhost:5000/graphql', {
  headers: {
    'x-token': getToken() || '',
  },
});

export const sdk = getSdk(client);
