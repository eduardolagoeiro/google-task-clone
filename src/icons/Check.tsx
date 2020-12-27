import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckProps {
  width: number;
  height: number;
  color: string;
}

export default function CheckBox(props: CheckProps) {
  return (
    <Svg {...props.width} viewBox="0 0 14 11" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.14.766a1.172 1.172 0 011.674 1.64l-6.237 7.797a1.171 1.171 0 01-1.688.031L.756 6.1a1.172 1.172 0 111.656-1.656l3.272 3.27L11.111.8a.362.362 0 01.031-.034h-.001z"
        fill={props.color}
      />
    </Svg>
  );
}
