import React from 'react';
import { Container, Text } from 'components/';

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Text view="title">404</Text>
      <Text view="title">Page Not Found</Text>
    </Container>
  );
};

export default NotFoundPage;
