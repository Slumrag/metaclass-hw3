import classNames from 'classnames';
import * as React from 'react';
import { type WithRenderer } from 'utils/types/WithRenderer';
import style from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<WithRenderer<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  render,
  ...props
}) => {
  const renderProps: IconProps = {
    className: classNames(style.icon, style[color as string], className),
    width,
    height,
    ...props,
  };

  return render(renderProps);
};

export default Icon;
