import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGCheckIcon from './SVGCheckIcon';

const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGCheckIcon {...props} />} {...props}></Icon>
);

export default CheckIcon;
