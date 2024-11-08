import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGEyeIcon from './SVGEyeIcon';

const EyeIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGEyeIcon {...props} />} {...props1}></Icon>
);

export default EyeIcon;
