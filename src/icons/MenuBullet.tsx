import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MenuBulletProps {
  height: number;
  width: number;
}

function MenuBullet(props: MenuBulletProps) {
  return (
    <Svg viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M11 6.875a1.375 1.375 0 100-2.75 1.375 1.375 0 000 2.75zM11 12.375a1.375 1.375 0 100-2.75 1.375 1.375 0 000 2.75zM11 17.875a1.375 1.375 0 100-2.75 1.375 1.375 0 000 2.75z"
        fill="#000"
      />
    </Svg>
  );
}

export default MenuBullet;
