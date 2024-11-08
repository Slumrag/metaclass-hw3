import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowDownIcon from './SVGArrowDownIcon';

const ArrowDownIcon: React.FC<IconProps> = observer((props) => (
  <Icon render={(props) => <SVGArrowDownIcon {...props} />} {...props}></Icon>
));

export default ArrowDownIcon;
