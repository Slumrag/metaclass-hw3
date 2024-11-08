import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGLinkIcon from './SVGLinkIcon';

const LinkIcon: React.FC<IconProps> = observer((props) => (
  <Icon render={(props) => <SVGLinkIcon {...props} />} {...props}></Icon>
));

export default LinkIcon;
