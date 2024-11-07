import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGEyeIcon from './SVGEyeIcon';

const EyeIcon: React.FC<IconProps> = observer((props1) => (
  <Icon render={(props) => <SVGEyeIcon {...props} />} {...props1}></Icon>
));

export default EyeIcon;
