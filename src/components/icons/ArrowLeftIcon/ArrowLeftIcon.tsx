import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowLeftIcon from './SVGArrowLeftIcon';

const ArrowLeftIcon: React.FC<IconProps> = observer((props) => (
  <Icon render={(props) => <SVGArrowLeftIcon {...props} />} {...props}></Icon>
));

export default ArrowLeftIcon;
