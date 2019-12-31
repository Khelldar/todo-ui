import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';

const url = 'https://todo-server-gql.herokuapp.com/graphql';

export function sdk(token?: string) {
  const client = !token
    ? new GraphQLClient(url)
    : new GraphQLClient(url, {
        headers: {
          'x-token': token,
        },
      });
  return getSdk(client);
}
