import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGStarIcon from './SVGStarIcon';

const StarIcon: React.FC<IconProps> = observer((props) => (
  <Icon render={(props) => <SVGStarIcon {...props} />} {...props}></Icon>
));

export default StarIcon;
