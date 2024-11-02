import React from 'react';
import './App.scss';

import MainPage from 'App/pages/MainPage';
import { Layout } from 'components/';

const App: React.FC = () => {
  return (
    <Layout>
      <MainPage></MainPage>
    </Layout>
  );
};

export default App;
