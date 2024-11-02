import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGStarIcon from './SVGStarIcon';

const StarIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGStarIcon {...props} />} {...props1}></Icon>
);

export default StarIcon;
