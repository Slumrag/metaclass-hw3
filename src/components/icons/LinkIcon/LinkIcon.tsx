import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGLinkIcon from './SVGLinkIcon';

const LinkIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGLinkIcon {...props} />} {...props}></Icon>
);

export default LinkIcon;
