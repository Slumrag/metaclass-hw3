import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGLoaderIcon from './SVGLoaderIcon';

const LoaderIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGLoaderIcon {...props} />} {...props}></Icon>
);

export default LoaderIcon;
