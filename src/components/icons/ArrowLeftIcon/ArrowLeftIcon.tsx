import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowLeftIcon from './SVGArrowLeftIcon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGArrowLeftIcon {...props} />} {...props}></Icon>
);

export default ArrowLeftIcon;
