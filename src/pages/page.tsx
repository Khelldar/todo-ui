import React from 'react';

import { ReducerProvider } from './reducer';
import { WhiteBoard } from './whiteBoard';

export const WhiteBoardPage: React.FC = () => {
  console.log('page render');
  return (
    <ReducerProvider>
      <WhiteBoard />
    </ReducerProvider>
  );
};
