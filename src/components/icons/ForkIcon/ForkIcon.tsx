import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGForkIcon from './SVGForkIcon';

const ForkIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGForkIcon {...props} />} {...props1}></Icon>
);

export default ForkIcon;
