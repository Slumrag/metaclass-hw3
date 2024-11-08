import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGForkIcon from './SVGForkIcon';

const ForkIcon: React.FC<IconProps> = observer((props) => (
  <Icon render={(props) => <SVGForkIcon {...props} />} {...props}></Icon>
));

export default ForkIcon;
