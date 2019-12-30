import React, { useContext } from 'react';

import * as queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { sdk } from './graphql/sdk';
import { setToken } from './token';
import { UserContext } from './userContext';
import { hostName } from './hostname';

const client_id =
  '41737293779-p142uda4rpgsfgc2uai4446505l2m941.apps.googleusercontent.com';

const redirect_uri = `${hostName}/oauth/google`;

const stringifiedParams = queryString.stringify({
  client_id,
  redirect_uri,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    // 'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export const GoogleOauth: React.FC = () => {
  const { code } = queryString.parse(window.location.search);
  const [user, setUser] = useContext(UserContext);

  if (typeof code !== 'string') {
    console.log('bad or missing code!');
    return <Redirect to="/" />;
  }

  if (user) {
    return <Redirect to="/todos" />;
  }

  //this is a total hack and is relying on the redirect above
  //need to think about loading state management here
  //this is also duplicate logic also found in normal login flow
  sdk.loginWithGoogle({ code }).then(data => {
    setToken(data.loginWithGoogle.accessToken);
    setUser(data.loginWithGoogle.user);
  });

  return <div>logging in...</div>;
};
