import * as React from 'react';
import './Text.css';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view = 'p-16',
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
  ...props
}) => {
  const classFullName = `Text Text-${view}${className ? ' ' + className : ''}`;

  const colorMapping = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };

  const renderProps: React.ComponentProps<'div'> = {
    className: classFullName,
    style: {},
    ...props,
  };

  if (color !== undefined) {
    const computedColor = `var(--${colorMapping[color]})`;
    renderProps!.style!.color = computedColor;
  }

  if (weight !== undefined) {
    renderProps!.style!.fontWeight = weight;
  }

  if (maxLines !== undefined) {
    renderProps!.style!.lineClamp = maxLines;
    renderProps!.style!.WebkitLineClamp = maxLines;
  }

  const tagMapping: Record<string, React.ReactElement> = {
    p: <p {...renderProps}>{children}</p>,
    h1: <h1 {...renderProps}>{children}</h1>,
    h2: <h2 {...renderProps}>{children}</h2>,
    h3: <h3 {...renderProps}>{children}</h3>,
    h4: <h4 {...renderProps}>{children}</h4>,
    h5: <h5 {...renderProps}>{children}</h5>,
    h6: <h6 {...renderProps}>{children}</h6>,
    div: <div {...renderProps}>{children}</div>,
    span: <span {...renderProps}>{children}</span>,
  };

  return tagMapping[tag];
};

export default Text;
