import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';
import { getToken } from '../token';

const url = 'https://todo-server-gql.herokuapp.com/graphql';

// export function sdk(token?: string) {
//   const client = !token
//     ? new GraphQLClient(url)
//     : new GraphQLClient(url, {
//         headers: {
//           'x-token': token,
//         },
//       });
//   return getSdk(client);
// }

const client = new GraphQLClient(url, {
  headers: {
    'x-token': getToken() || '',
  },
});

export const sdk = getSdk(client);
