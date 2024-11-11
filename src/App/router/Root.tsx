import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'components/';
import { DEFAULT_ORG } from 'configs/api';
import { useQueryParamsStoreInit } from 'store/';

const Root = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  useQueryParamsStoreInit();
  useEffect(() => {
    if (location.pathname === '/') navigate(DEFAULT_ORG);
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
});

export default Root;
