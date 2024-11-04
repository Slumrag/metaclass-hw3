import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGLinkIcon from './SVGLinkIcon';

const LinkIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGLinkIcon {...props} />} {...props1}></Icon>
);

export default LinkIcon;
