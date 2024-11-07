import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowLeftIcon from './SVGArrowLeftIcon';

const ArrowLeftIcon: React.FC<IconProps> = observer((props1) => (
  <Icon render={(props) => <SVGArrowLeftIcon {...props} />} {...props1}></Icon>
));

export default ArrowLeftIcon;
