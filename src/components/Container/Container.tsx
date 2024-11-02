import classNames from 'classnames';
import React from 'react';
import style from './Container.module.scss';

export type ContainerProps = React.ComponentProps<'div'> & {
  //есть ли боковые отступы. По умолчанию true
  pad?: boolean;
  // направление главной оси флекс контейнера
  direction?: 'row' | 'column';
  // выравнивание относительно главной оси флекс контейнера
  align?: 'start' | 'center' | 'end';
};

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  direction = 'column',
  pad = true,
  align = 'center',
  ...props
}) => {
  return (
    <div
      className={classNames(style.container, style[direction], { [style.padding]: pad }, style[align], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
