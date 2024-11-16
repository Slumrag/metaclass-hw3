import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGSearchIcon from './SVGSearchIcon';

const SearchIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGSearchIcon {...props} />} {...props}></Icon>
);

export default SearchIcon;
