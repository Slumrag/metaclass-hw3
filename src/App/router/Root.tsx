import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'components/';
import { useQueryParamsStoreInit } from 'store/';

const Root = observer(() => {
  useQueryParamsStoreInit();
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
});

export default Root;
