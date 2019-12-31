import React, { useContext } from 'react';

import * as queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { UserContext } from './user/userContext';
import { hostName } from './hostname';
import { SdkContext } from './sdkContext';

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
  const [state, dispatch] = useContext(UserContext);
  const sdk = useContext(SdkContext);

  if (typeof code !== 'string') {
    console.log('bad or missing code!');
    return <Redirect to="/" />;
  }

  if (state.state === 'loggedIn') {
    return <Redirect to="/" />;
  }

  //this is a total hack and is relying on the redirect above
  //need to think about loading state management here
  sdk.loginWithGoogle({ code }).then(data => {
    dispatch({
      type: 'LoggedIn',
      payload: {
        user: data.loginWithGoogle.user,
        token: data.loginWithGoogle.accessToken,
      },
    });
  });

  return <div>logging in...</div>;
};
