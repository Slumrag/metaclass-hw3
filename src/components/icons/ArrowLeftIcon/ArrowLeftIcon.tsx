import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowLeftIcon from './SVGArrowLeftIcon';

const ArrowLeftIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGArrowLeftIcon {...props} />} {...props1}></Icon>
);

export default ArrowLeftIcon;
