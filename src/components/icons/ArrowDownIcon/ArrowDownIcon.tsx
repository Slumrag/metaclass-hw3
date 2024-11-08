import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowDownIcon from './SVGArrowDownIcon';

const ArrowDownIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGArrowDownIcon {...props} />} {...props1}></Icon>
);

export default ArrowDownIcon;
