import { getTokenFromStorage } from '../token';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/sdk';

const url = 'https://todo-server-gql.herokuapp.com/graphql';

//CONSIDER - should token come from someplace else? should token be set here?
//Want to avoid being split brained with things that set the token in localstorage
//having it all come from one place is easy for now, but there's for sure a race condition on login
const client = new GraphQLClient(url, {
  headers: {
    'x-token': getTokenFromStorage() || '',
  },
});

export const sdk = getSdk(client);
