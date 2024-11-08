import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGSearchIcon from './SVGSearchIcon';

const SearchIcon: React.FC<IconProps> = (props1) => (
  <Icon render={(props) => <SVGSearchIcon {...props} />} {...props1}></Icon>
);

export default SearchIcon;
