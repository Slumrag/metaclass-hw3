import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'components/';
import { DEFAULT_ORG } from 'configs/api';

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') navigate(DEFAULT_ORG);
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Root;
