import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowDown(props: {
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <Svg
      width={props.width || 12}
      height={props.height || 8}
      viewBox="0 0 12 8"
      fill="none"
      {...props}
    >
      <Path
        d="M1.41.59L6 5.17 10.59.59 12 2 6 8 0 2 1.41.59z"
        fill={props.color || '#000'}
      />
    </Svg>
  );
}
