import * as React from 'react';
import variables from 'components/_variables.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

type WithRenderer<T> = T & {
  render: (props: T) => React.ReactElement;
};

const Icon: React.FC<WithRenderer<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  render,
  ...props
}) => {
  const colorMap = {
    primary: 'iconPrimary',
    secondary: 'iconSecondary',
    accent: 'iconAccent',
  };

  const computedColor = color !== undefined ? colorMap[color] : 'inherit';
  const renderProps: IconProps = {
    className,
    width,
    height,
    fill: variables[computedColor],
    stroke: variables[computedColor],
    ...props,
  };

  return render(renderProps);
};

export default Icon;
