import React, { FC } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from './types';

export const ArrowRightIcon: FC<IconProps> = ({ color, size, style }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={style}>
      <Path
        transform="translate(4,0)"
        d="M10 9C9.99023 8.6582 9.86328 8.36523 9.59961 8.10156L2.00195 0.669922C1.77734 0.455078 1.51367 0.337891 1.19141 0.337891C0.537109 0.337891 0.0292969 0.845703 0.0292969 1.5C0.0292969 1.8125 0.15625 2.10547 0.380859 2.33008L7.2168 9L0.380859 15.6699C0.15625 15.8945 0.0292969 16.1777 0.0292969 16.5C0.0292969 17.1543 0.537109 17.6621 1.19141 17.6621C1.50391 17.6621 1.77734 17.5449 2.00195 17.3301L9.59961 9.88867C9.87305 9.63477 10 9.3418 10 9Z"
        fill={color}
      />
    </Svg>
  );
};
