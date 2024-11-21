import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGEyeIcon from './SVGEyeIcon';

const EyeIcon: React.FC<IconProps> = (props) => <Icon render={(props) => <SVGEyeIcon {...props} />} {...props}></Icon>;

export default EyeIcon;
