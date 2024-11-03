export type WithRenderer<T> = T & {
  render: (props: T) => React.ReactElement;
};
