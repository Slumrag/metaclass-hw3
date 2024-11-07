import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import SVGGithubIcon from './SVGGithubIcon';

const GithubIcon: React.FC<IconProps> = observer((props1) => (
  <Icon render={(props) => <SVGGithubIcon {...props} />} {...props1}></Icon>
));

export default GithubIcon;
