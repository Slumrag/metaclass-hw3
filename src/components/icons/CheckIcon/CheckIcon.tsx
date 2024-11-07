import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGCheckIcon from './SVGCheckIcon';

const CheckIcon: React.FC<IconProps> = observer((props1) => (
  <Icon render={(props) => <SVGCheckIcon {...props} />} {...props1}></Icon>
));

export default CheckIcon;
