import { AxiosError } from 'axios';
import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Container, Text } from 'components/';
import style from './ErrorPage.module.scss';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as AxiosError;
  console.error(error);

  return (
    <Container className={style.container}>
      <Text view="title">{error.status}</Text>
      <Text view="p-18">{error.message}</Text>
    </Container>
  );
};

export default ErrorPage;
