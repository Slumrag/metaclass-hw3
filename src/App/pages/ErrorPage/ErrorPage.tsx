import React, { useEffect } from 'react';
import { isRouteErrorResponse, NavLink, useRouteError } from 'react-router-dom';
import { Container, Text } from 'components/';
import ErrorElement from './components';
import style from './ErrorPage.module.scss';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleError = (error: unknown) => {
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 404:
          return <ErrorElement status={error.status} message="Page Not Found" />;
        case 401:
          return <ErrorElement status={error.status} message="Unauthorized access to page" />;

        default:
          return <ErrorElement status={error.status} message={error.statusText} />;
      }
    }
    if (error instanceof Error) {
      return <ErrorElement status={error.name} message={error.message} />;
    }
  };
  return (
    <Container className={style.container}>
      {handleError(error)}
      <NavLink to={'/'} className={style.link}>
        <Text view="p-20" weight={'bold'} color="accent">
          go to homepage
        </Text>
      </NavLink>
    </Container>
  );
};

export default ErrorPage;
