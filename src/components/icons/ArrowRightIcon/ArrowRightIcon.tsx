import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGArrowRightIcon from './SVGArrowRightIcon';

const ArrowRightIcon: React.FC<IconProps> = observer((props1) => (
  <Icon render={(props) => <SVGArrowRightIcon {...props} />} {...props1}></Icon>
));

export default ArrowRightIcon;
