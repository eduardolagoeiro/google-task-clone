import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function MagicCheck(props: {
  width?: number;
  height?: number;
  color: string;
  percentage: number;
}) {
  const circleOffset = 50.24085998535156;
  const checkedOffset = -22.55687141418457;

  const offset = (props.percentage / 100) * circleOffset + checkedOffset;

  return (
    <Svg
      viewBox="0 0 24 24"
      width={props.width || 24}
      height={props.height || 24}
    >
      <G
        fill="none"
        stroke={props.color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          strokeDasharray={`${circleOffset} ${circleOffset}`}
          strokeDashoffset={offset}
          d="M20 6.7L9.3 17.3 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8"
        />
      </G>
    </Svg>
  );
}
