import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGLoaderIcon from './SVGLoaderIcon';

const LoaderIcon: React.FC<IconProps> = observer((props1) => (
  <Icon render={(props) => <SVGLoaderIcon {...props} />} {...props1}></Icon>
));

export default LoaderIcon;
