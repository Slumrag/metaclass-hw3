import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowDownIcon from './SVGArrowDownIcon';

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGArrowDownIcon {...props} />} {...props}></Icon>
);

export default ArrowDownIcon;
