import React, { useMemo } from 'react';
import { Rectangle } from 'react-rough';

export interface Props {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const SimpleShape: React.FC<Props> = props => {
  const seed = useMemo(() => {
    return hash(props.id);
  }, [props.id]);

  console.log(`SimpleShape render ${props.id}`);
  return (
    <div>
      <Rectangle {...props} seed={seed} />
    </div>
  );
};

export function hash(s?: string) {
  if (!s) {
    return Math.floor(Math.random() * 10) + 1;
  }

  const sumOfCharCodes = s
    .split('')
    .map(o => o.charCodeAt(0))
    .reduce((a, b) => a + b, 0);
  return (sumOfCharCodes % 10) + 1;
}
