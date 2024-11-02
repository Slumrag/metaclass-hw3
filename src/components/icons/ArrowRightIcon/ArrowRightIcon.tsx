import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowRightIcon from './SVGArrowRightIcon';

const ArrowRightIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGArrowRightIcon {...props} />} {...props1}></Icon>
);

export default ArrowRightIcon;
