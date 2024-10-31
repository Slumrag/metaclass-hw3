import * as React from 'react';
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
    primary: 'icon-primary',
    secondary: 'icon-secondary',
    accent: 'icon-accent',
  };

  const computedColor =
    color !== undefined ? `var(--${colorMap[color]})` : 'inherit';
  const renderProps: IconProps = {
    className,
    width,
    height,
    fill: computedColor,
    stroke: computedColor,
    ...props,
  };

  return render(renderProps);
};

export default Icon;
