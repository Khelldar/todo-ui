import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';

// const url = 'http://localhost:5000/graphql';
const url = '/graphql';

const client = new GraphQLClient(url, {
  credentials: 'include',
});

export const sdk = getSdk(client);
