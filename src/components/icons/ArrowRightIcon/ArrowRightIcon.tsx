import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowRightIcon from './SVGArrowRightIcon';

const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGArrowRightIcon {...props} />} {...props}></Icon>
);

export default ArrowRightIcon;
