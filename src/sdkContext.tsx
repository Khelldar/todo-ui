import React, { useContext } from 'react';
import { sdk as getSdk } from './graphql/sdk';
import { UserContext } from './user/userContext';

export const SdkContext = React.createContext(getSdk());

export const SdkProvider: React.FC = props => {
  const [userState] = useContext(UserContext);

  return (
    <SdkContext.Provider value={getSdk(userState.token)}>
      {props.children}
    </SdkContext.Provider>
  );
};
