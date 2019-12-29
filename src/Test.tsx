import React, { useContext, useState, useEffect } from 'react';
import { sdk } from './graphql/sdk';
import { Test } from './generated/sdk';
import { UserContext } from './userContext';

export const TestComponent: React.FC = () => {
  const [user] = useContext(UserContext);

  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    sdk.test().then(data => {
      setTest(data.test);
    });
  }, []);

  if (!test) {
    return <div>loading...</div>;
  }

  return (
    <div>
      test:
      {JSON.stringify(test)}
      <hr></hr>
      user:
      {JSON.stringify(user)}
    </div>
  );
};
