import React from 'react';
import Text from 'components/Text';
import style from './ErrorElement.module.scss';

export type ErrorElementProps = {
  status: string | number;
  message?: string;
};

const ErrorElement: React.FC<ErrorElementProps> = ({ status, message }) => {
  return (
    <div className={style.errorElement}>
      <Text view="title" className={style.title}>
        {status}
      </Text>
      <Text view="p-20" color="secondary" className={style.subtitle}>
        {message}
      </Text>
    </div>
  );
};
export default ErrorElement;
