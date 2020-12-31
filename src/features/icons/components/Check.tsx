import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckProps {
  width: number;
  height: number;
  color: string;
}

export default function CheckBox(props: CheckProps) {
  return (
    <Svg
      viewBox="0 0 22 16"
      fill="none"
      {...props}
      width={props.width}
      height={props.height}
    >
      <Path
        d="M7.184 11.931L2.158 7.194 0 9.228 7.184 16 22 2.034 19.842 0 7.184 11.931z"
        fill={props.color}
      />
    </Svg>
  );
}
