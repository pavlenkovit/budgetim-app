import React, { FC } from 'react';
import { Svg, Path, G } from 'react-native-svg';
import { IconProps } from './types';

export const ArrowDownIcon: FC<IconProps> = ({ color, size, style }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" style={style}>
      <G transform="rotate(-90)">
        <Path
          transform="translate(-15,0)"
          d="M0 9C0 9.3418 0.126953 9.63477 0.400391 9.88867L7.99805 17.3301C8.21289 17.5449 8.48633 17.6621 8.80859 17.6621C9.45312 17.6621 9.9707 17.1543 9.9707 16.5C9.9707 16.1777 9.83398 15.8945 9.61914 15.6699L2.77344 9L9.61914 2.33008C9.83398 2.10547 9.9707 1.8125 9.9707 1.5C9.9707 0.845703 9.45312 0.337891 8.80859 0.337891C8.48633 0.337891 8.21289 0.455078 7.99805 0.669922L0.400391 8.10156C0.126953 8.36523 0 8.6582 0 9Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};
