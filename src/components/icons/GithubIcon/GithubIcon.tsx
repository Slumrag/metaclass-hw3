import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGGithubIcon from './SVGGithubIcon';

const GithubIcon: React.FC<IconProps> = (props) => (
  <Icon render={(props) => <SVGGithubIcon {...props} />} {...props}></Icon>
);

export default GithubIcon;
