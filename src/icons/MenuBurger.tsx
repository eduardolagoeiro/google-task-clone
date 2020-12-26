import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MenuBurgerProps {
  height: number;
  width: number;
  color: string;
}

function MenuBurger(props: MenuBurgerProps) {
  return (
    <Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M17.778 16.111H2.222a.555.555 0 110-1.111h15.556a.555.555 0 110 1.111zM17.778 10.556H2.222a.556.556 0 010-1.112h15.556a.556.556 0 010 1.112zM17.778 5H2.222a.556.556 0 110-1.111h15.556a.556.556 0 010 .111z"
        fill={props.color}
      />
    </Svg>
  );
}

export default MenuBurger;
